export interface ISignIn {
  data: {
    id: number,
    username: string,
    role: string,
    email: string,
    password?: string,
  },
  token?: string
}

export interface IToken {
  id: number,
  username: string,
  role: string,
  email: string,
  password?: string,
}

export interface ILogin {
  login(email: string, password: string): Promise<ISignIn | null>;
}
