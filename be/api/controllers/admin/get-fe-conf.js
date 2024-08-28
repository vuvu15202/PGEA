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
        let confs = Conf.getCacheFe();
        return exits.success({ confs });
    }
};
