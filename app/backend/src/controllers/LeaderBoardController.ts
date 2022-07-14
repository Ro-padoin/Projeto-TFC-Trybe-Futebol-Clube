import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderBoardService from '../services/LeaderBoardService';
import { ILeaderBoards } from '../interfaces';

class LeaderBoardController {
  private serviceLeader: LeaderBoardService;

  constructor(private service: ILeaderBoards) {
    this.service = service;
  }

  // static verifyUrl(originaUrl: string): IMatchAttribute {
  //   const matchAttribute = originaUrl === '/leaderboard/home'
  //     ? { homeTeam: 'homeTeam', awayTeam: 'awayTeam' }
  //     : { homeTeam: 'awayTeam', awayTeam: 'homeTeam' };
  //   return matchAttribute;
  // }

  async createLeaderBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const matchAttribute = req.originalUrl === '/leaderboard/home' ? 'homeTeam' : 'awayTeam';
      const leaderBoard = await this.service.createLeaderBoard(matchAttribute);
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  }

  async createLeaderBoardGeneral(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderBoard = await this.service.createLeaderBoardGeneral();
      return res.status(StatusCodes.OK).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderBoardController;
