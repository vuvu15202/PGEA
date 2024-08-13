let services = {};
let processes = {};
let backjobs = {};
let runningFlags = {};

let template = function (runningFlagName, interval, cb) {
  setInterval(async () => {
    console.log("backjob: " + runningFlagName);
    if (runningFlags[runningFlagName]) {
      console.log("backjob: " + runningFlagName + "is still running!");
      return;
    }
    runningFlags[runningFlagName] = true;
    await cb();
    runningFlags[runningFlagName] = false;
  }, interval);
};

services.initialize = function () {
  for (let key in processes) {
    let process = processes[key];
    backjobs[key] = () => {
      template(key, process.interval, process.logic);
    };
  }
};

services.run = function () {
  for (let key in backjobs) {
    let job = backjobs[key];
    setTimeout(() => {
      job();
    }, 1000);
  }
};

module.exports = services;

processes.cleanCaptcha = {
  description: "10 phút xóa dữ liệu captcha đã hết hạn 1 lần",
  interval: 10 * 1000 * 60,
  logic: async () => {
    await Capt.destroy({
      expiredAt: {
        "<": moment().valueOf(),
      },
    });
  },
};

processes.cleanAuthPermission = {
  description: "Cách một ngày lại xóa đi các auth hết hạn 1 lần",
  interval: 24 * 60 * 60 * 1000,
  logic: async () => {
    await AuthPermission.destroy({
      expiredAt: {
        "<": moment().valueOf(),
      },
    });
  },
};


processes.cleanLog = {
  description: "Xóa cứng các log",
  interval: 24 * 60 * 60 * 1000,
  logic: async () => {
    try {
      await LogCallApi.destroy({
        createdAt: {
          "<": moment().subtract(3, "months").valueOf(),
        },
      });
      await AppNotiCatcherLog.destroy({
        updatedAt: {
          "<": moment().subtract(3, "months").valueOf(),
        },
      });
      let where = {
        updatedAt: {
          "<": moment().subtract(1, "months").valueOf(),
        },
        status: {
          in: [
            PayOnTransaction.STATUS.CREATED,
            PayOnTransaction.STATUS.INPROGRESS,
            PayOnTransaction.STATUS.FREEZEED,
            PayOnTransaction.STATUS.FAILED,
            PayOnTransaction.STATUS.DENIED,
          ],
        },
      };
      let payOnTransaction = await PayOnTransaction.find(where);
      let payOnIds = [];
      let paymentTransIds = [];
      for (let i = 0; i < payOnTransaction.length; i++) {
        const pot = payOnTransaction[i];
        payOnIds.push(pot.id);
        if (pot.objModel === "paymentTransaction") {
          paymentTransIds.push(pot.fromObjModelId);
        }
      }
      await PayOnTransaction.destroy({ id: { in: payOnIds } });
      await PaymentTransaction.destroy({
        id: { in: paymentTransIds.map((v) => +v) },
      });
      let temp = await PaymentTransaction.destroy({
        updatedAt: {
          "<": moment().subtract(1, "months").valueOf(),
        },
        paymentMethod: "banktransfer",
        status: {
          in: [
            PaymentTransaction.STATUS.FAILED,
            PaymentTransaction.STATUS.INPROGRESS,
            PaymentTransaction.STATUS.NEW,
          ],
        },
      }).fetch();
      for (let i = 0; i < temp.length; i++) {
        const trans = temp[i];
        paymentTransIds.push(trans.id + "");
      }
      await ChangeStatusLog.destroy({
        forModelId: { in: paymentTransIds },
        forModel: "paymentTransaction",
      });
      
    } catch (error) {
      log.error(error);
    }
  },
};

processes.ProcessingQueueMail = {
  description: "1 phút lấy queue xử lý 1 lần",
  interval: 60 * 1000,
  logic: async () => {
    try {
      let limitRate = Conf.getDataFromKey("MAIL_PER_MINUTE") || 20;
      let mailNeedSend = await LogSmsEmail.find({
        isSuccess: false,
        type: "EMAIL",
      }).limit(limitRate);
      console.log({ mailNeedSend: mailNeedSend.length });
      let count = 0;
      for (let i = 0; i < mailNeedSend.length; i++) {
        const mail = mailNeedSend[i];
        count += mail.quantity;
        if (count > limitRate) {
          break;
        }
        await mailer.sendMail(mail);
        console.log({ count });
      }
    } catch (error) {
      log.error(error);
    }
  },
};

processes.LoginFshare = {
  description: "6 tiếng login lại fshare 1 lần",
  interval: 6 * 60 * 60 * 1000 - 60 * 1000,
  logic: async () => {
    await fshare.login();
  },
};
