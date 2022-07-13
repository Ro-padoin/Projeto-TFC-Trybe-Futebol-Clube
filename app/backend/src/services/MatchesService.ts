import { StatusCodes } from 'http-status-codes';
import MatchesModel from '../database/models/MatchesModels';
import { IMatch, IMatches } from '../interfaces';
import TeamsModels from '../repositoryModel/TeamsRepository';
import ErrorMiddleware from '../utils/error';

class MatchesService implements IMatches {
  private team: TeamsModels;

  constructor(private model: IMatches) {
    this.model = model;
    this.team = new TeamsModels();
  }

  async getAllMatches(): Promise<IMatches | null> {
    const matches = await this.model.getAllMatches();

    if (!matches) {
      throw new ErrorMiddleware(404, 'Matches not found.');
    }
    return matches as unknown as IMatches;
  }

  async createNewMatch(match: IMatch): Promise<MatchesModel | null> {
    const { homeTeam, awayTeam } = match;

    if (homeTeam === awayTeam) {
      throw new ErrorMiddleware(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const homeTeamExists = await this.team.getTeamById(homeTeam);
    const awayTeamExists = await this.team.getTeamById(awayTeam);

    if (!homeTeamExists || !awayTeamExists) {
      throw new ErrorMiddleware(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    const newMatch = await this.model.createNewMatch({ ...match, inProgress: true });

    return newMatch as unknown as MatchesModel;
  }

  async getMatchHomeTeam(id: number): Promise<IMatch[]> {
    const matchesById = await this.model.getMatchHomeTeam(id);
    return matchesById as unknown as IMatch[];
  }

  async getMatchById(id: number): Promise<MatchesModel | null> {
    const matchById = await this.model.getMatchById(id);
    return matchById;
  }

  async updateMatchToFinished(id: number): Promise<void | null> {
    const matchById = await this.getMatchById(id);

    if (!matchById) {
      throw new ErrorMiddleware(StatusCodes.NOT_FOUND, 'Match not found.');
    }

    const finished = await this.model.updateMatchToFinished(id);
    return finished;
  }

  async updateGamesInProgress(id: number, body: IMatch): Promise<void | null> {
    const matchById = await this.getMatchById(id);

    if (!matchById) {
      throw new ErrorMiddleware(StatusCodes.NOT_FOUND, 'Match not found.');
    }

    const finished = await this.model.updateGamesInProgress(id, body);
    console.log({ finished });
    return finished;
  }
}

export default MatchesService;
