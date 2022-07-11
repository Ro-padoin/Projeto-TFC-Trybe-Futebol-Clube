import TeamsModels from '../database/models/TeamsModels';
import { ITeams } from '../interfaces';
import ErrorMiddleware from '../utils/error';

class TeamsService implements ITeams {
  constructor(private model: ITeams) {
    this.model = model;
  }

  async getAllTeams(): Promise<TeamsModels | null> {
    const teams = await this.model.getAllTeams();

    if (!teams) {
      throw new ErrorMiddleware(404, 'Teams not found');
    }
    return teams as unknown as TeamsModels;
  }
}

export default TeamsService;
