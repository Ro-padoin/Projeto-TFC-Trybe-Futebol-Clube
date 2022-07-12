import TeamsModels from '../database/models/TeamsModels';
import MatchesModel from '../database/models/MatchesModels';
import { IMatches } from '../interfaces';

class MatchesRepository implements IMatches {
  constructor(private model = MatchesModel) {
  }

  async getAllMatches(): Promise<MatchesModel | null> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamsModels, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModels, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    console.log(matches);

    return matches as unknown as MatchesModel;
  }
}

export default MatchesRepository;
