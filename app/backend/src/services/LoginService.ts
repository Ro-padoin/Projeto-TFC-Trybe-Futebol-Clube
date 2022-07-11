import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import ErrorMiddleware from '../utils/error';
import { ILoginRepository, ILoginService } from '../interfaces/index';
import UsersModel from '../database/models/UsersModel';
import generateToken from '../helpers/generateToken';

class LoginService implements ILoginService {
  constructor(private model: ILoginRepository) {
    this.model = model;
  }

  async login(email:string, password:string): Promise<UsersModel | null> {
    const userExists = await this.model.login(email);

    if (!userExists || userExists.email !== email) {
      throw new ErrorMiddleware(401, 'Incorrect email or password');
    }

    const comparePassword = await bcrypt.compare(password, userExists.password as string);

    if (!comparePassword) {
      throw new ErrorMiddleware(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const { password: trashPassword, ...payload } = userExists;

    const token = generateToken(payload);

    return token as unknown as UsersModel;
  }

  async loginValidate(id: number): Promise<UsersModel | null> {
    const userExists = await this.model.loginById(id);

    if (!userExists) {
      throw new ErrorMiddleware(StatusCodes.BAD_REQUEST, 'User Not Exists');
    }

    return userExists.role as unknown as UsersModel;
  }
}

export default LoginService;
