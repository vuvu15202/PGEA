var Redis = require("ioredis");
var redis = new Redis(sails.config.datastores.redis);
module.exports = {
    sendCommad: async (cmd) => {
        // LogFile.add('sentinel', `[SEND CMD] [${cmd}]`);
        return new Promise((resolve, reject) => {
            redis.sendCommand()(key, second, (err, rs) => {
                try {
                    if (!err) return resolve(Number(rs));
                    //   LogFile.add('sentinel', `[EXPIRE] [${key}] [${second}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    expire: async (key, second) => {
        // LogFile.add('sentinel', `[EXPIRE] [${key}] [${second}]`);
        return new Promise((resolve, reject) => {
            redis.expire(key, second, (err, rs) => {
                try {
                    if (!err) return resolve(Number(rs));
                    //   LogFile.add('sentinel', `[EXPIRE] [${key}] [${second}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    increase: async (key, val = 1) => {
        // LogFile.add('sentinel', `[INCR] [${key}] [${val}]`);
        return new Promise((resolve, reject) => {
            redis.incrby(key, val, (err, rs) => {
                try {
                    if (!err) return resolve(Number(rs));
                    //   LogFile.add('sentinel', `[INCR] [${key}] [${val}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    decrease: async (key, val = 1) => {
        // LogFile.add('sentinel', `[DECR] [${key}] [${val}]`);
        return new Promise((resolve, reject) => {
            redis.decrby(key, val, (err, rs) => {
                try {
                    if (!err) return resolve(rs);
                    //   LogFile.add('sentinel', `[DECR] [${key}] [${val}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    setRaw: async (key, val) => {
        // LogFile.add('sentinel', `[SET RAW] [${key}] [${val}]`);
        return new Promise((resolve, reject) => {
            redis.set(key, val, (err, rs) => {
                try {
                    if (!err) return resolve();
                    //   LogFile.add('sentinel', `[SET RAW] [${key}] [${val}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    set: async (key, val) => {
        // LogFile.add('sentinel', `[SET] [${key}]`);
        return new Promise((resolve, reject) => {
            redis.set(key, JSON.stringify(val), (err, rs) => {
                try {
                    if (!err) return resolve();
                    //   LogFile.add('sentinel', `[SET] [${key}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    get: async (key) => {
        // LogFile.add('sentinel', `[GET] [${key}]`);
        return new Promise((resolve, reject) => {
            redis.get(key, (err, rs) => {
                try {
                    if (!err) return resolve(safeParse(rs));
                    //   LogFile.add('sentinel', `[GET] [${key}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    //*********CODES********* */
    push: async (queue, data) => {
        // LogFile.add('sentinel', `[PUSH] [${queue}]`);
        return new Promise((resolve, reject) => {
            redis.lpush(queue, JSON.stringify(data), (err, rs) => {
                try {
                    if (!err) {
                        return resolve(safeParse(rs));
                    }
                    //   LogFile.add('sentinel', `[PUSH] [${queue}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    pop: async (queue) => {
        // LogFile.add('sentinel', `[POP] [${queue}]`);
        return new Promise((resolve, reject) => {
            redis.rpop(queue, (err, rs) => {
                try {
                    if (!err) {
                        return resolve(safeParse(rs));
                    }
                    //   LogFile.add('sentinel', `[POP] [${queue}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    del: async (key) => {
        return new Promise((resolve, reject) => {
            redis.del(key, (err, rs) => {
                try {
                    if (!err) return resolve(rs);
                    //   LogFile.add('sentinel', `[INCR] [${key}] [${val}] [${JSON.stringify(err)}]`);
                    return reject(err);
                } catch (err) {
                    return reject(err);
                }
            })
        })
    },
    client: redis
};

function safeParse(text) {
    try {
        if (!text) return text;
        return JSON.parse(text);
    } catch (err) {
        return null;
    }
}
