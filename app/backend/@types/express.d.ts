declare namespace Express {
  export interface Request {
    userInfo: {
      id: string
      username: string
      role: string
      email:string
    }
  }
}