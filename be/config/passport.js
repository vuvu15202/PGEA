const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const moment = require('moment');
const globalVar = require('./globals').globals;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromExtractors(
  [ExtractJwt.fromUrlQueryParameter("authentication_token"),
  // ExtractJwt.fromHeader("authentication_token"),
  ExtractJwt.fromAuthHeaderAsBearerToken()]
); //ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = globalVar.JWT_TOKEN_SECRET;

passport.use(new JwtStrategy(opts, (payload, done) => {
  if (payload.exp && payload.exp < moment().valueOf()) {
    payload.message = sails.__('Session time out!');
    return done(null, false, payload);
  }
  return done(null, true, payload);
}));


//--------------------    login google  ------------------------------

// Configure the Google strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new GoogleStrategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: '/api/auth/sign-in/account-google-redirect',
      scope: ['profile', 'email'],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
  
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


