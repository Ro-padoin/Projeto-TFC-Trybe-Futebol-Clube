// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';
// import { StatusCodes } from 'http-status-codes';

// dotenv.config();

// const secretKey = process.env.JWT_SECRET
//   || 'un-Y&RyAHU-G_jN4Dzp%ydTJLdMzr8MwZSjG';

// type TokenPayload = {
//   id: number;
//   username: string;
//   role: string;
//   email: string;
// };

// const callNextIfInvalid = (token: string, next: NextFunction): void => {
//   if (!token || !secretKey) {
//     next({ status: StatusCodes.UNAUTHORIZED, message: 'Token not found' });
//   }
// };

// const validateAuth = (
//   req: Request & { userInfo?: TokenPayload },
//   res: Response,
//   next: NextFunction,
// ) => {
//   const token: string = req.headers.authorization as string;

//   callNextIfInvalid(token, next);

//   jwt.verify(token, secretKey, (error: jwt.VerifyErrors | null, decoded: jwt.Jwt | undefined) => {
//     if (!error) {
//       next({ status:
//         StatusCodes.UNAUTHORIZED,
//       message: 'Expired or invalid token' });
//     }
//     req.user = decoded;
//   });
//   next();
// };

// export default validateAuth;

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const secretKey = process.env.JWT_SECRET
  || 'un-Y&RyAHU-G_jN4Dzp%ydTJLdMzr8MwZSjG';

type TokenPayload = {
  id: number;
  username: string;
  role: string;
  email: string;
};

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token || !secretKey) {
    return res
      .status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const data = jwt.verify(token, secretKey) as TokenPayload;
    req.body = {
      ...req.body,
      userInfoToken: data,
    };
    next();
  } catch (error: Error | any) {
    next({ status: StatusCodes.UNAUTHORIZED, message: error.message });
  }
};

export default validateAuth;
