import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

// type TokenPayload = {
//   id: number;
//   username: string;
//   role: string;
//   email: string;
// };

const secretKey: string | undefined = process.env.JWT_SECRET
    || 'un-Y&RyAHU-G_jN4Dzp%ydTJLdMzr8MwZSjG';

const generateToken = ({ ...payload }) => jwt.sign(payload, secretKey);

export default generateToken;
