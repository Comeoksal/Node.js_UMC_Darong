export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    statusCode = 409;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateRegionError extends Error {
    errorCode = "U002";
    statusCode = 409;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateStoreError extends Error {
    errorCode = "U003";
    statusCode = 409;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoExistStoreError extends Error {
    errorCode = "U004";
    statusCode = 404;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateReviewError extends Error {
    errorCode = "U005";
    statusCode = 409;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}