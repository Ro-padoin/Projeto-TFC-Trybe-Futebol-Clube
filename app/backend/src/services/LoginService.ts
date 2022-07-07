// import generateToken from 'src/helpers/generateToken';
// import { StatusCodes } from 'http-status-codes';
import { ILogin, ISignIn } from '../interfaces';

// interface IMessage {
//   status: number,
//   message: string,
// }

// const errorMessage: IMessage = ({ status: 404, message: 'Invalida email or password' });

class Login implements ILogin {
  constructor(private model: ILogin) {
    this.model = model;
  }

  async login(email:string, password:string): Promise<ISignIn | null> {
    const user = await this.model.login(email, password);

    if (!user) throw new Error('Invalida email or password');

    return user;
  }
}

export default Login;
