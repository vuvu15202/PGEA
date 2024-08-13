var redis = require("redis"),
client = redis.createClient(sails.config.datastores.redis);
client.auth(sails.config.datastores.redis.password);
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
  log.error(err);
});
client.on("ready", () => {
  sails.log.info("Redis server is ready!");
});

module.exports = {
  
  get: async (key) => {
    try {
      let data = await new Promise((resolve, reject) => {
        client.get(key, function (err, reply) {
          if (err) return reject(err);
          resolve(reply);
        });
      });
      return data;
    } catch (error) {
      return error;
    }
  },

  set: async (key, val, ttl) => {
    if (ttl) {
      client.set(key, val, "EX", ttl);
    } else {
      client.set(key, val);
    }
    return { key, val, ttl };
  },

  del: async (key) => {
    try {
      let ok = await new Promise((resolve, reject) => {
        client.del(key, function (err, o) {
          if (err) {
            return reject(err);
          }
          return resolve(o);
        });
      });

      return ok;
    } catch (error) {
      error;
    }
    return { key, val, ttl };
  },

  refreshCache: async () => {
    try {
      console.log("RefreshCache");
      let promises = [];
      for (var index in sails.models) {
        let model = sails.models[index];
        if (model.refreshCache) {
          promises.push(model.refreshCache());
        }
      }
      Promise.all(promises)
        .then(() => {
          console.log("Done RefreshCache");
        })
        .catch((err) => {
          log.error(err);
          console.log("Done RefreshCache with error", String(err));
        });

      return sails.__("Cache update done!");
    } catch (err) {
      return err;
    }
  },
};
