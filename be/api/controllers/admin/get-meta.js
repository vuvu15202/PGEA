module.exports = {


    friendlyName: 'Get admin meta',
    type: 'backend',

    description: 'Lấy thông tin cần thiết hiển thị trên trang quản trị',


    inputs: {

    },


    exits: {
        success: {
            statusCode: 200
        }
    },


    fn: async function (inputs, exits) {
        let pages = Page.getCache(),
          menus = Menu.getCache(),
          langs = Language.getCache(),
          confs = Conf.getCacheFe();
        return exits.success({ pages, menus, langs ,confs});
    }
};
