import { NextFunction, Request, Response } from 'express';
import { ILogin } from '../interfaces';

class Login {
  constructor(private service: ILogin) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const result = await this.service.login(email, password);
      return res.status(200).json(result);
    } catch (err) {
      console.log('🚀 ~ file: LoginController.ts ~ line 16 ~ Login ~ login ~ err', err);
      next();
    }
  }
}

export default Login;
