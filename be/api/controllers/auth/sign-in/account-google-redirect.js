const passport = require('passport');
const jsonWebToken = require('../../../services/jwt');

module.exports = {
  friendlyName: 'Google auth callback',

  description: 'Handle Google OAuth callback',

  inputs: {},

  exits: {
    success: {
      description: 'Successfully authenticated.'
    },
    failure: {
      description: 'Authentication failed.',
      responseType: 'view',
      viewTemplatePath: 'pages/login-failed'
    }
  },

  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;

    passport.authenticate('google', async (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed",
          error: err || 'User not found'
        });
      }
      // console.log(user);

      let account = user.emails[0].value.toLowerCase().split('@')[0];
      let password =  "Hellosailer0";
      let email = user.emails[0].value.toLowerCase();
      try {
        
        let ret = {};
        let exitsUser = await User.find({
          email: email,
          isDelete: false
        });

        let googleAuths = await Auth.find({
          type: 'google'
        }).populate('user');

        let googleAuth = googleAuths.filter(auth => auth.user.email == email);

        // let usersWithGoogleAuth = await User.find({
        //   email: userIds,
        //   isDelete: false
        // });
        if (!googleAuth || googleAuth.length == 0) {
          let defaultUserType = Conf.getDataFromKey("DEFAULT_USERTYPE_ON_REGISTING") || 3;
          let roleId = [];
          let {
            auth,
            user
          } = await sails.getDatastore()
            .transaction(async (db) => {
              let createNewUser = {
                name: account,
                locale: 'vi',
                email: email,
                userType: defaultUserType,
                roleId
              }
              let createNewAuth = {
                key: account,
                password: password,
                type: 'google',
                activated: true
              }
    
              let createdUser = await User.create(createNewUser).fetch().usingConnection(db);
              createNewAuth.user = createdUser.id;
              createNewAuth = await Auth.create(createNewAuth).fetch().usingConnection(db);
              return {
                user: createdUser,
                auth: createNewAuth
              };
            });
            ret = {auth: auth, user: user};
        }
        // else if(Array.isArray(exitsUser) && exitsUser.length >1){
        //   let googleAuths = await Auth.find({
        //     type: 'google'
        //   });


        //   return res.status(400).json({
        //     success: false,
        //     message: "Authentication failed",
        //     error: err || 'User not found'
        //   });
        // }

        try {
          // let user = await User.findOne({
          //   email: email,
          //   isDelete: false,
          // }).populate("userType");

          // let user = await Auth.findOne({
          //   type: 'google'
          // }).populate('user').filter(auth => auth.user.email == email);

          // let user = await Auth.findOne({
          //   type: 'google'
          // }).populate('user',
          //   {
          //     where: {
          //       email: email
          //     }
          //   }
          // );
  

          // if (user.locked) {
          //   return {
          //     status: false,
          //     message: sails.__("Account was blocked!"),
          //   };
          // }

          let googleAuths = await Auth.find({
            type: 'google'
          }).populate('user');
          let user = googleAuths.filter(auth => auth.user.email == email)[0].user;

          let auth = await Auth.findOne({type: 'google', user: user.id});
          if (!auth || !auth.user) {
            return res.status(401).json({
              status: false,
              message: sails.__("Wrong account infomation!"),
            });
          }
          if (!auth.activated) {
            return res.status(401).json({
              status: false,
              message: sails.__("Account was not activate!"),
            });
          }
          
          let ret = {auth: auth, user: user};
    
          // if (ret.status) {
          //   let {
          //     auth,
          //     user
          //   } = ret.obj;
    
          //   req.auth = auth;
          //   req.user = user;
          //   ret = Object.assign({}, ret.obj);
          //   let timeToLifeToken = Conf.getDataFromKey("TTL_TOKEN");
          //   ret.token = await jsonWebToken.generate(ret, timeToLifeToken || 0);
          //   User.removeUneccessaryValue(ret.user);
          //   Auth.removeUneccessaryValue(ret.auth);
          //   UserType.removeUneccessaryValue(ret.user.userType);
          //   return res.status(200).json({
          //     ret
          //   });
          // }

            req.auth = auth;
            req.user = user;
            let timeToLifeToken = Conf.getDataFromKey("TTL_TOKEN");
            ret.token = await jsonWebToken.generate(ret, timeToLifeToken || 0);
            User.removeUneccessaryValue(ret.user);
            Auth.removeUneccessaryValue(ret.auth);
            return res.status(200).json({
              ret
            });

        } catch (e) {
          return res.serverError(e);
        }


        // return exits.success({
        //   message: sails.__('Please check your email to activate your account!')
        // });
      } catch (e) {
        return res.serverError(e);
      }

    })(req, res);
  }
};
