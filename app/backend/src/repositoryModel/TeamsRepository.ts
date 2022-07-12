import TeamsModels from '../database/models/TeamsModels';
import { ITeams } from '../interfaces';

class TeamsRepository implements ITeams {
  constructor(private model = TeamsModels) {
  }

  async getAllTeams(): Promise<TeamsModels | null> {
    const teams = await this.model.findAll();

    return teams as unknown as TeamsModels;
  }

  async getTeamById(id: string): Promise<TeamsModels | null> {
    const team = await this.model.findByPk(Number(id));

    return team as unknown as TeamsModels;
  }
}

export default TeamsRepository;
