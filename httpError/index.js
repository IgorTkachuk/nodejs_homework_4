class httpError extends Error {
    constructor (message, httpStatus) {
        super();
        this.message = message;
        this.status = httpStatus;
    }
}

module.exports = httpError;