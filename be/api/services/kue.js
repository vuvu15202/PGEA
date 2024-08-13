// let services = {};
// var kue = require("kue");
// var q = kue.createQueue({
//   prefix: sails.config.datastores.redis.prefix + "_q_",
//   redis: {
//     port: sails.config.datastores.redis.port,
//     host: sails.config.datastores.redis.host,
//     auth: sails.config.datastores.redis.auth_pass,
//     db: sails.config.datastores.redis.db, // if provided select a non-default redis db
//     options: {
//       retry_strategy: function (options) {
//         if (options.error && options.error.code === "ECONNREFUSED") {
//           // End reconnecting on a specific error and flush all commands with
//           // a individual error
//           return new Error("The server refused the connection");
//         }
//         if (options.total_retry_time > 1000 * 60 * 60) {
//           // End reconnecting after a specific timeout and flush all commands
//           // with a individual error
//           return new Error("Retry time exhausted");
//         }
//         if (options.attempt > 10) {
//           // End reconnecting with built in error
//           return undefined;
//         }
//         // reconnect after
//         return Math.min(options.attempt * 100, 3000);
//       },
//     },
//   },
// });

// services.createJob = async function (type, jobDefinde) {
//   return new Promise((resolve, reject) => {
//     var job = q.create(type, jobDefinde).save(function (err) {
//       if (err)
//         return reject({
//           err,
//           job,
//         });
//       return resolve({
//         job,
//       });
//     });
//     job
//       .on("complete", function (result) {
//         console.log(`Job ${type}  with data `, result);
//         // q.client.expire(q.client.getKey('job:' + job.id), 60*60*1000);
//         setTimeout(() => {
//           try {
//             job.remove();
//             console.log("success:::remove job " + job.id)
//           } catch (error) {
//             console.error("fail:::remove job " + job.id)
//           }

//         }, 10000);
//       })
//       .on("failed attempt", function (errorMessage, doneAttempts) {
//         console.log({
//           failAttempt: type,
//           errorMessage,
//           doneAttempts,
//         });
//       })
//       .on("failed", function (errorMessage) {
//         console.log({
//           fail: type,
//           errorMessage,
//         });
//       })
//       .on("progress", function (progress, data) {
//         console.log(
//           "\r  job #" + job.id + " " + progress + "% complete with data ",
//           data
//         );
//       });
//   });
// };

// // q.process('update_target_statistic', function (job, done) {
// //   doUpdateTargetStatistic(job.data, done).catch(e => log.error(e));
// // })

// // async function doUpdateTargetStatistic(jobData, done) {
// //   try {
// //     let target = await Target.findOne({
// //       id: jobData.target
// //     });
// //     if (!target) throw new Error('Target not found!');
// //     let updateData = {}
// //     switch (jobData.type) {
// //       case '+checklist':
// //         updateData.checklistDone = target.checklistDone + jobData.value
// //         break;
// //       case '+vul':
// //         updateData.vulHigh = target.vulHigh + (jobData.vulHigh || 0);
// //         updateData.vulCritical = target.vulCritical + (jobData.vulCritical || 0);
// //         updateData.vulLow = target.vulLow + (jobData.vulLow || 0);
// //         updateData.vulMedium = target.vulMedium + (jobData.vulMedium || 0);
// //         break;
// //       default:
// //         break;
// //     }

// //     await Target.updateOne({
// //       id: target.id
// //     }).set(updateData)
// //     done();
// //   } catch (error) {
// //     done(error)
// //   }
// // }

// module.exports = services;
