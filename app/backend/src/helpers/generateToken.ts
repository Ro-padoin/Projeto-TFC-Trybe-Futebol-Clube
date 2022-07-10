import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const secretKey: string | undefined = process.env.JWT_SECRET
    || 'un-Y&RyAHU-G_jN4Dzp%ydTJLdMzr8MwZSjG';

const generateToken = ({ ...payload }) => jwt.sign(payload, secretKey, {
  expiresIn: '30d',
  algorithm: 'HS256',
});

export default generateToken;
