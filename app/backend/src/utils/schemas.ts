import * as Joi from 'joi';
import { ILoginSchema } from '../interfaces';

const schemaLogin = Joi.object<ILoginSchema>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default { schemaLogin };
