import UsersModel from '../database/models/UsersModel';

export interface ILoginRepository extends Partial<UsersModel> {
  password?: string,
  token?: string,
  login(email: string): Promise<UsersModel | null>
  loginById(id: number): Promise<UsersModel | null>
}

export interface ILoginService {
  login(email: string, password: string): Promise<UsersModel | null>;
  loginValidate(id: number): Promise<UsersModel | null>;
}

export interface ILoginSchema {
  email: string
  password: string
}
