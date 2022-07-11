import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const secretKey: string | undefined = process.env.JWT_SECRET
    || 'un-Y&RyAHU-G_jN4Dzp%ydTJLdMzr8MwZSjG';

// type TokenPayload = {
//   id: number;
//   username: string;
//   role: string;
//   email: string;
// };

const generateToken = ({ ...payload }) => jwt.sign(payload, secretKey, {
  expiresIn: '3650d',
  algorithm: 'HS256',
});

export default generateToken;
