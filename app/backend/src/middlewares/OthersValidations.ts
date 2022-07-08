import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import valid from '../utils/schemas';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const validate = valid.schemaLogin.validate(body);

  if (validate.error) {
    const { type, message } = validate.error.details[0];
    console.log({ type, message });
    if (type === 'any.required' || type === 'string.empty') {
      next({ status: StatusCodes.BAD_REQUEST, message });
    }
    next(next({ status: StatusCodes.BAD_REQUEST, message }));
  }
  next();
};

export default { validateLogin };
