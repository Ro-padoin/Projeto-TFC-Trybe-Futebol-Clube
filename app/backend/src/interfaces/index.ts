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
  getAllTeams(): Promise<TeamsModels | null>;
  getTeamById(id: number): Promise<TeamsModels | null>;
}

export interface IMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface IMatches extends Partial<MatchesModel> {
  teamHome?: {
    teamName: 'São Paulo'
  },
  teamAway?: {
    teamName: 'Grêmio'
  }
  getAllMatches(): Promise<IMatches | null>;
  createNewMatch(match: IMatch): Promise<MatchesModel | null>;
}

export interface ILoginSchema {
  email: string
  password: string
}
