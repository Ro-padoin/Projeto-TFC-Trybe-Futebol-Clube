import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILoginService } from '../interfaces';

class LoginController {
  constructor(private service: ILoginService) {
    this.service = service;
  }

  async login(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
      }
    }
  }
}

export default LoginController;
