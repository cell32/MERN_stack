import {
  UnAuthenticatedError,
  UnAuthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnAuthenticatedError("authentication failed");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "6748b8359878b04c8d1d75ee";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("authentication failed");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorizedError("unauthorized access");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
