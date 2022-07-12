import MatchesModel from '../database/models/MatchesModels';
import { IMatches } from '../interfaces';
import ErrorMiddleware from '../utils/error';

class MatchesService implements IMatches {
  constructor(private model: IMatches) {
    this.model = model;
  }

  async getAllMatches(): Promise<MatchesModel | null> {
    const matches = await this.model.getAllMatches();

    if (!matches) {
      throw new ErrorMiddleware(404, 'Matches not found');
    }
    return matches as unknown as MatchesModel;
  }
}

export default MatchesService;
