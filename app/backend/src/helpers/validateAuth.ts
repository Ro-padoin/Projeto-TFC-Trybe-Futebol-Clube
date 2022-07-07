// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';
// import { StatusCodes } from 'http-status-codes';

// dotenv.config();

// const secretKey = process.env.JWT_SECRET
//   || 'un-Y&RyAHU-G_jN4Dzp%ydTJLdMzr8MwZSjG';

// type TokenPayload = {
//   id: string
//   username: string
// };

// const validateAuth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;

//   if (!token || !secretKey) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
//   }

//   try {
//     const data = jwt.verify(token, secretKey);
//     req.userInfo = data as unknown as TokenPayload;

//     next();
//   } catch {
//     return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
//   }
// };

// export default validateAuth;
