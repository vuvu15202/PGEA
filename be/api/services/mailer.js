let services = {};
const nodemailer = require("nodemailer");

services.sendMail = async function (logSmsEmail) {
    // console.log({ to, subject, content, req, payload })
    // let mailIndex = await redis.increase('obt_' + (process.env.NODE_ENV || 'development') + "_mail_no");
    let payload = {};
    try {
        let accounts = Conf.getDataFromKey("EMAIL_ACCOUNT").split("|");
        let account = accounts[0];
        let password = Conf.getDataFromKey("EMAIL_PASSWORD").split("|")[0];
        // if (mailIndex >= accounts.length) {
        //     await redis.set('obt_' + (process.env.NODE_ENV || 'development') + "_mail_no", 0);
        // }
        let emailHost = Conf.getDataFromKey("EMAIL_HOST");
        let emailPort = Conf.getDataFromKey("EMAIL_PORT");
        let emailFrom = Conf.getDataFromKey("EMAIL_FROM");
        let secure = Conf.getDataFromKey("EMAIL_SECURE") === 1;

        let mailConfig = {
            host: emailHost,
            port: emailPort,
            secure: secure, // true for 465, false for other ports
            auth: {
                user: account,
                pass: password
            }
            ,
            tls: {
                ciphers: 'SSLv3'
            }
        }
        let mailOptions = {
            from: `"${emailFrom}" <${account}>`, // sender address
            to: logSmsEmail.to + '', // list of receivers
            subject: logSmsEmail.subject, // Subject line
            html: logSmsEmail.content // html body
        };
        payload.mailConfig = mailConfig;
        payload.mailOptions = mailOptions;
        let transporter = nodemailer.createTransport(mailConfig);
        let info = await transporter.sendMail(mailOptions);
        let tmp = {
            accepted: info.accepted,
            rejected: info.rejected
        }
        let updated = {
            isSuccess: true,
            responseInfo: tmp,
        }

        await LogSmsEmail.update({ id: logSmsEmail.id }).set(updated);

        return {
            status: true,
            info
        }
    } catch (error) {
        log.error(error);
        payload.error = error;
        let updated = {
            isSuccess: true,
            payload
        }
        await LogSmsEmail.update({ id: logSmsEmail.id }).set(updated);
        return {
            status: false,
            error
        }
    }
}


module.exports = services;
