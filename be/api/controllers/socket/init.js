function joinRoom(req, room) {
  let promise = new Promise((resolve1, reject1) => {
    sails.sockets.join(req, room, (err) => {
      if (err) {
        return reject1(err);
      }
      // console.log('join room', room);
      return resolve1();
    });
  });
  return promise;
}


module.exports = {


  friendlyName: 'Init',


  description: 'Init socket. Đẩy người dùng hiện tại vào 1 room.',


  inputs: {},

  exits: {},


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    let rooms = socketService.rooms;
    if (!req.isSocket) {
      return res.badRequest({ message: sails.__('Phương thức kết nối không được chấp nhận!') });
    }

    try {
      await joinRoom(req, rooms.USER + req.user.id)
      await joinRoom(req, rooms.SYSTEM)
      return res.ok({ message: sails.__('200') })
    } catch (error) {
      return res.serverError(error)
    }

  }


};
