import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BadRequestError;
  }
}

export class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
