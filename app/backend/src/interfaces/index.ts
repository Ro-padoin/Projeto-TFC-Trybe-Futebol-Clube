import MatchesModel from '../database/models/MatchesModels';
import TeamsModels from '../database/models/TeamsModels';
import UsersModel from '../database/models/UsersModel';

export interface ILoginRepository extends Partial<UsersModel> {
  password?: string,
  token?: string,
  login(email: string): Promise<UsersModel | null>
  loginById(id: number): Promise<UsersModel | null>
}

export interface ILoginService {
  login(email: string, password: string): Promise<UsersModel | null>;
  loginValidate(id: number): Promise<UsersModel | null>;
}

export interface ITeams {
  getAllTeams(): Promise<TeamsModels[]>;
  getTeamById(id: number): Promise<TeamsModels | null>;
}

export interface IMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  length?: number;
}

export interface ITeam {
  id: number,
  teamName: string,
}

export interface IMatches extends Partial<MatchesModel> {
  teamHome?: {
    teamName: string
  },
  teamAway?: {
    teamName: string
  }
  getAllMatches(): Promise<IMatches | null>;
  createNewMatch(match: IMatch): Promise<IMatch | null>;
  getMatchHomeTeam(id: number): Promise<IMatch[]>;
  getMatchById(id: number): Promise<MatchesModel | null>;
  updateMatchToFinished(id: number): Promise<void | null>;
  updateGamesInProgress(id: number, data: Partial<IMatch>): Promise<void | null>;
}

export interface ILeaderBoard {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface ILeaderBoards extends Partial<ILeaderBoard> {
  createLeaderBoard(): Promise<ILeaderBoard | null>
}

export interface ILoginSchema {
  email: string
  password: string
}
