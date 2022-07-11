import TeamsModels from '../database/models/TeamsModels';
import { ITeams } from '../interfaces';

class TeamsRepository implements ITeams {
  constructor(private model = TeamsModels) {
  }

  async getAllTeams(): Promise<TeamsModels | null> {
    const teams = await this.model.findAll();

    return teams as unknown as TeamsModels;
  }
}

export default TeamsRepository;
