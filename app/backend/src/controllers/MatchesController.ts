import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatches } from '../interfaces';

class MatchesController {
  constructor(private service: IMatches) {
    this.service = service;
  }

  async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.getAllMatches();
      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async createNewMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatche = await this.service.createNewMatch(req.body);
      return res.status(StatusCodes.CREATED).json(newMatche);
    } catch (error) {
      next(error);
    }
  }

  async updateMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const finished = await this.service.updateMatch(Number(id));
      return res.status(StatusCodes.CREATED).json(finished);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchesController;
