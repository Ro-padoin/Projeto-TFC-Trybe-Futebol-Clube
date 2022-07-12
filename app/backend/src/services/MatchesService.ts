import { StatusCodes } from 'http-status-codes';
import MatchesModel from '../database/models/MatchesModels';
import TeamsModels from '../repositoryModel/TeamsRepository';
import { IMatch, IMatches } from '../interfaces';
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
      throw new ErrorMiddleware(404, 'Matches not found');
    }
    return matches as unknown as IMatches;
  }

  async createNewMatch(match: IMatch): Promise<MatchesModel | null> {
    const { homeTeam, awayTeam } = match;
    const homeTeamExists = await this.team.getTeamById(homeTeam);
    const awayTeamExists = await this.team.getTeamById(awayTeam);

    if (!homeTeamExists || !awayTeamExists) {
      throw new ErrorMiddleware(StatusCodes.NOT_FOUND, 'Teams not found.');
    }

    if (homeTeam === awayTeam) {
      throw new ErrorMiddleware(
        StatusCodes.BAD_REQUEST,
        'Home team and away team cannot be equal.',
      );
    }

    const newMatch = await this.model.createNewMatch({ ...match, inProgress: true });

    return newMatch as unknown as MatchesModel;
  }
}

export default MatchesService;
