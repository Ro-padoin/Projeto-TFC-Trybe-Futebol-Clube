import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITeams } from '../interfaces';

class TeamsController {
  constructor(private service: ITeams) {
    this.service = service;
  }

  async getAllTeams(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAllTeams();
      return res.status(StatusCodes.OK).json(teams);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamsController;
