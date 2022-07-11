import UsersModel from '../database/models/UsersModel';
import { ILoginRepository } from '../interfaces';

class LoginRepository implements ILoginRepository {
  constructor(private model = UsersModel) {
  }

  async login(email: string): Promise<UsersModel | null> {
    const data = await this.model.findOne({ where: { email } });

    const user = {
      id: data?.getDataValue('id'),
      username: data?.getDataValue('username'),
      email: data?.getDataValue('email'),
      role: data?.getDataValue('role'),
      password: data?.getDataValue('password'),
    };

    return user as UsersModel;
  }

  async loginById(id: number): Promise<UsersModel | null> {
    const userById = await this.model.findByPk(id);
    return userById as UsersModel;
  }
}

export default LoginRepository;
