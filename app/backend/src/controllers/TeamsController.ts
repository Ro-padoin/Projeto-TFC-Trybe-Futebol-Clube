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

  async getTeamById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(id);
      return res.status(StatusCodes.OK).json(team);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamsController;
