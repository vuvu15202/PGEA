let services = {};
const fetch = require('node-fetch');
const uuidv1 = require('uuid/v1');
const nodemailer = require("nodemailer");

services.pushNotiFCM = async function (fcmToken, title, content) {
    let url = `https://fcm.googleapis.com/fcm/send`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "key=" + Conf.getDataFromKey("FCM_SERVER_TOKEN"),
      },
      body: JSON.stringify({
        to: fcmToken,
        data: {
          //android
          custom_notification: {
            title: title,
            body: content,
            sound: "default",
            priority: "high",
            show_in_foreground: true,
            channel: "fcm_itrithuc",
            color: "#FF0000",
          },
        },
        notification: {
          title: title,
          body: content,
          sound: "default",
          priority: "high",
          show_in_foreground: true,
          color: "#FF0000",
        },
        priority: 10,
      }),
      json: true,
    };
    try {
        await fetch(url, options);

        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
            message: String(error)
        };
    }

};
services.pushNotiSocket = function (userId, noticeObj = {
    // id: uuidv1(),
    user: 1,
    subject: 'test Data',
    content: 'test',
    seen: false,
    level: 'warning',
    redirectUrl: ''
}) {
    socketService.send(socketService.rooms.USER + userId, noticeObj);
}

services.sendMail = async function (to, subject, content, req, payload = {}) {

    try {
        let sign = `<p>Thanks and best regards,<br/>PGEA Development</p>`;
        content = `<div style="font-size: 17px">${content}</div>` + sign;
        let create = {
            id: uuidv1(),
            to: to + '',
            content: content,
            type: 'EMAIL',
            subject: subject,
            isSuccess: false,
            quantity: (to + '').split(',').length,
            payload
        }
        if (req && req.user) {
            create.createdBy = req.user.id || undefined;
        }
        let logSmsEmail = await LogSmsEmail.create(create).fetch();
        mailer.sendMail(logSmsEmail);

        return {
            status: true,
            logSmsEmail
        }
    } catch (error) {
        log.error(error);
        return {
            status: false,
            error
        }
    }

}

services.sendMailByUserId = async function (listUserId, subject, content, req, payload = {}) {
    let user = await User.find({ id: listUserId });
    let listEmail = [];
    user.map(v => { if (v.email) { listEmail.push(v.email) } });
    return await services.sendMail(listEmail, subject, content, req, payload)
}



module.exports = services;