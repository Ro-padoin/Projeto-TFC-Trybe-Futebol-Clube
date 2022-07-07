import { NextFunction, Request, Response } from 'express';
import { ILoginService } from '../interfaces';

class LoginController {
  constructor(private service: ILoginService) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
