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
      const newMatch = await this.service.createNewMatch(req.body);
      return res.status(StatusCodes.CREATED).json(newMatch);
    } catch (error) {
      next(error);
    }
  }

  async updateMatchToFinished(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const finished = await this.service.updateMatchToFinished(Number(id));
      return res.status(StatusCodes.OK).json(finished);
    } catch (error) {
      next(error);
    }
  }

  async updateGamesInProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userInfoToken, ...newBody } = req.body;
      const body = Object.keys(newBody).length > 0 ? newBody : { inProgress: false };
      const finished = await this.service.updateGamesInProgress(Number(id), body);
      return res.status(StatusCodes.OK).json(finished);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchesController;
