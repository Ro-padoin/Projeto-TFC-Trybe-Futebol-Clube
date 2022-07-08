import * as bcrypt from 'bcryptjs';
import { ILoginRepository, ILoginService } from '../interfaces/index';
import UsersModel from '../database/models/UsersModel';
import generateToken from '../helpers/generateToken';

class LoginService implements ILoginService {
  constructor(private model: ILoginRepository) {
    this.model = model;
  }

  async login(email:string, password:string): Promise<UsersModel | null> {
    const userExists = await this.model.login(email);

    const comparePassword = bcrypt.compareSync(password, userExists?.password as string);

    if (!userExists || userExists.email !== email || !comparePassword) {
      throw new Error('Incorrect email or password');
    }

    const { password: trashPassword, ...payload } = userExists;

    const token = generateToken(payload);

    return token as unknown as UsersModel;
  }
}

export default LoginService;
