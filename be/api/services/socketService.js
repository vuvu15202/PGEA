let services = {};
services.rooms = {
  USER: 'user-', //tin riêng cho từng user - id
  SYSTEM: 'system', //bắn notice dạng hệ thống
};
services.send = function (rooms, jsonData = {}) {
  log.info(`Send socket notice to ${rooms}: ${JSON.stringify(jsonData)}`);
  try {
    sails.sockets.broadcast(rooms, 'message', jsonData);
  } catch (error) {
    log.error(error)
  }
};
services.sendSystem = function (jsonData) {
  log.info(`Send socket notice to system: ${JSON.stringify(jsonData)}`);
  try {
    sails.sockets.broadcast('system', 'system', jsonData);
  } catch (error) {
    log.error(error)
  }
};

module.exports = services;