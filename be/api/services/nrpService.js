var NRP = require("node-redis-pubsub");
var redis = require("redis");
var redisPub = redis.createClient(sails.config.datastores.redis);
var redisSub = redis.createClient(sails.config.datastores.redis);
redisSub.auth(sails.config.datastores.redis.password);
redisPub.auth(sails.config.datastores.redis.password);

var config = {
  emitter: redisPub, // Pass in an existing redis connection that should be used for pub
  receiver: redisSub, // Pass in an existing redis connection that should be used for sub
};

var nrp = new NRP(config); // This is the NRP client

nrp.on(
  sails.config.datastores.redis.prefix + "_refresh_cache",
  function (data) {
    if (
      data &&
      data.modelName &&
      sails.models[data.modelName] &&
      sails.models[data.modelName].refreshCache
    ) {
      sails.models[data.modelName]
        .refreshCache()
        .then()
        .catch((err) => {
          log.error(err);
        });
    }
  }
);

nrp.on(sails.config.datastores.redis.prefix + "_send_socket", function (data) {
  try {
    pushNotification.pushNotiSocket(data.user, data);
  } catch (error) {
    log.error(error);
  }
});

module.exports = {
  getNrp: function () {
    return nrp;
  },
};
