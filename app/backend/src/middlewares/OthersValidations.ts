import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import valid from '../utils/schemas';

const createReturnError = (type: string, message: string, res: Response) => res
  .status(StatusCodes.BAD_REQUEST).json({ message });

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const validate = valid.schemaLogin.validate(body);
  if (validate.error) {
    const { type, message } = validate.error.details[0];
    return createReturnError(type, message, res);
  }
  next();
};

export default { validateLogin };
