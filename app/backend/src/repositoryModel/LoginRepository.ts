import UsersModel from '../database/models/UsersModel';
import { ILoginRepository } from '../interfaces';

class LoginRepository implements ILoginRepository {
  constructor(private model = UsersModel) {
  }

  async login(email: string): Promise<UsersModel | null> {
    const user = await this.model.findOne({ where: { email } });
    return user?.get({ plain: true });
  }

  async loginById(id: number): Promise<UsersModel | null> {
    const dataValues = await this.model.findByPk(id);
    return dataValues as UsersModel;
  }
}

export default LoginRepository;
