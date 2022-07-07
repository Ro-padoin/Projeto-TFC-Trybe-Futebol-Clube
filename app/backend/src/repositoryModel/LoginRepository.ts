import UsersModel from '../database/models/UsersModel';
import { ILoginRepository } from '../interfaces';

class LoginRepository implements ILoginRepository {
  constructor(private model = UsersModel) {
  }

  async login(email: string): Promise<UsersModel | null> {
    const data = await this.model.findOne({ where: { email } });
    return data;
  }
}

export default LoginRepository;
