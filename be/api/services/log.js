module.exports = {
    error: (error, req) => {
        // console.log(error, req)
        error = error instanceof Error ? error : new Error(typeof error === 'object' ? JSON.stringify(error) : error);
        let saveLog = {
            error: error.stack,
            message: error.message
        }
        if (req) {
            saveLog = Object.assign({}, saveLog, {
                userId: (req.user || {}).id || null,
                authId: (req.auth || {}).id || null,
            })
        }
        sails.log.error(saveLog);
    },
    info: (message) => {
        sails.log.info(message)
    },
    debug: (message) => {
        sails.log.debug(message)
    },
    warn: (message) => {
        sails.log.warn(message)
    }

}