const jwt = require("jwt-simple");

module.exports = {
  friendlyName: "send mail by sql",

  description: "",

  inputs: {
    sql: {
      type: "string",
      required: true,
      description: "Bat buoc phai co truong email",
    },
    subject: { type: "string", required: true },
    template: { type: "string", required: true },
    isSend: { type: "boolean", defaultsTo: false },
  },

  exits: {},

  fn: async function (inputs, exits) {
    let { req, res } = this;

    try {
      let rs = await sails.getDatastore().sendNativeQuery(inputs.sql);
      let data = rs.rows;
      let cols = [];
      if (data.length) {
        cols = Object.keys(data[0]);
      }
      let ret = { data: [], count: 0 };
      let message = `<html>
      <h3>Hệ thống ghi nhận yêu cầu gửi email đến các địa chỉ với nội dung như sau:</h3></br></br>
      <table style="border: 1px solid black;border-collapse: collapse;">
      <tr style="border: 1px solid black;border-collapse: collapse;">
        <th style="border: 1px solid black;border-collapse: collapse;text-align: center;text-transform: capitalize;">#</th>
        <th style="border: 1px solid black;border-collapse: collapse;text-align: center;text-transform: capitalize;">Email</th>
        <th style="border: 1px solid black;border-collapse: collapse;text-align: center;text-transform: capitalize;">Subject</th>
        <th style="border: 1px solid black;border-collapse: collapse;text-align: center;text-transform: capitalize;">Content</th>
      </tr>
      {{BODY}}
    </table></html>`;
      let body = "";
      for (let i = 0; i < data.length; i++) {
        let tr = `<tr style="border: 1px solid black;border-collapse: collapse;">{{TD}}</tr>`;
        let td = `<td style="border: 1px solid black;border-collapse: collapse;text-align: center;padding:10px;">${
          i + 1 + ""
        }</td>`;

        const row = data[i];
        let content = inputs.template;
        let subject = inputs.subject;
        for (let j = 0; j < cols.length; j++) {
          const col = cols[j];
          let d = row[col];
          if (typeof d === "number") {
            d = Number(d).toLocaleString();
          }
          content = content.replaceAll(`{{${col}}}`, d || "");
          subject = subject.replaceAll(`{{${col}}}`, d || "");
        }
        let email = row["email"];
        try {
          td += `<td style="border: 1px solid black;border-collapse: collapse;text-align: center;padding:10px;">${email}</td>`;
          td += `<td style="border: 1px solid black;border-collapse: collapse;text-align: center;padding:10px;">${subject}</td>`;
          td += `<td style="border: 1px solid black;border-collapse: collapse;text-align: center;padding:10px;">${content}</td>`;
          tr = tr.replace("{{TD}}", td);
          body += tr;
          if (inputs.isSend) {
            let r = await pushNotification.sendMail(
              email,
              subject,
              content,
              req
            );
            ret.data.push(r);
            ret.count++;
          }
        } catch (error) {
          log.error(error);
        }
      }
      return res.ok({
        message: message.replace("{{BODY}}", body),
        ret,
      });
    } catch (error) {}
  },
};
