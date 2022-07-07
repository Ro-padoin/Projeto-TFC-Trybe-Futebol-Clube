import { ISignIn, ILogin } from '../interfaces';
import UsersModel from '../database/models/UsersModel';

class Login implements ILogin {
  constructor(private model = UsersModel) {
    this.model = UsersModel;
  }

  async login(email: string, _password: string): Promise<ISignIn | null> {
    const data = await this.model.findOne({ where: { email } });
    console.log('🚀 ~ file: Login.ts ~ line 11 ~ Login ~ login ~ data', data);
    if (!data) return null;
    const result = {
      data: {
        id: 1,
        username: 'John',
        role: 'admin',
        email: 'john@john.com',
      },
    };

    return result;
  }
}

export default Login;
