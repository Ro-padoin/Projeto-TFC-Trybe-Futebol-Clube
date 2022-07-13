import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderBoards } from '../interfaces';

class LeaderBoardController {
  constructor(private service: ILeaderBoards) {
    this.service = service;
  }

  async createLeaderBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await this.service.createLeaderBoard();
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderBoardController;
