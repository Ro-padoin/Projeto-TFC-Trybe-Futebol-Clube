import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IToken } from '../interfaces/index';

dotenv.config();

const secretKey: string | undefined = process.env.JWT_SECRET
    || 'un-Y&RyAHU-G_jN4Dzp%ydTJLdMzr8MwZSjG';

const generateToken = (payload: IToken) => jwt.sign(payload, secretKey);

export default generateToken;
