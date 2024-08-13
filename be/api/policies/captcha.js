module.exports = async function (req, res, next) {
    if (!req.enableCaptcha) {
        return next()
    }
    //Định dạng capcha gửi lên sv dạng: id|text

    let captcha = req.header.captcha || (req.query || {}).captcha || (req.body || {}).captcha || (req.params || {}).captcha
    if (!captcha) {
        return res.badRequest({
            message: sails.__('Missing captcha info!')
        });
    }
    let [id, text] = captcha.split('|');
    if (!id || !text) {
        return res.badRequest({
            message: sails.__('Invalid captcha!')
        });
    }
    let captCheck = await Capt.checkCaptcha(id, text);
    if (!captCheck) {
        return res.badRequest({
            message: sails.__('Invalid captcha!')
        });
    }
    return next();
};