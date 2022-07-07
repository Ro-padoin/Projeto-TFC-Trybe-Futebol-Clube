import UsersModel from '../database/models/UsersModel';

export interface ILoginRepository extends Partial<UsersModel> {
  password?: string,
  token?: string,
  login(email: string): Promise<UsersModel | null>
}

export interface ILoginService {
  login(email: string, password: string): Promise<UsersModel | null>;
}
