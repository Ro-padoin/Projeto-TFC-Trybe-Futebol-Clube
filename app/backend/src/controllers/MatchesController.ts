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
}

export default MatchesController;
