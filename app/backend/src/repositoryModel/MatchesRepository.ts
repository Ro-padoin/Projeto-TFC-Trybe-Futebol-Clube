import TeamsModels from '../database/models/TeamsModels';
import MatchesModel from '../database/models/MatchesModels';
import { IMatch, IMatches } from '../interfaces';

class MatchesRepository implements IMatches {
  constructor(private model = MatchesModel) {
  }

  async getAllMatches(): Promise<IMatches | null> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamsModels, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModels, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches as unknown as IMatches;
  }

  async createNewMatch(match: IMatch): Promise<MatchesModel | null> {
    const newMatch = await this.model.create(match);

    return newMatch as unknown as MatchesModel;
  }
}

export default MatchesRepository;
