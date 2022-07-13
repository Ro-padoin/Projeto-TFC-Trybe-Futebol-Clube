import { ILeaderBoard, ILeaderBoards, IMatch, IMatches, ITeam } from '../interfaces';
import TeamsModels from '../repositoryModel/TeamsRepository';
// import ErrorMiddleware from '../utils/error';

class LeaderBoardService implements ILeaderBoards {
  private teamModel: TeamsModels;

  constructor(private model: IMatches) {
    this.model = model;
    this.teamModel = new TeamsModels();
  }

  static createTotalVictories(matches: IMatch[]): number {
    return matches.reduce((acc: number, match: IMatch) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  static createTotalDraws(matches: IMatch[]): number {
    return matches.reduce((acc: number, match: IMatch) => {
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  static createTotalLosses(matches: IMatch[]): number {
    return matches.reduce((acc: number, match: IMatch) => {
      if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  static createGoalsFavor(matches: IMatch[]): number {
    return matches.reduce((acc: number, match: IMatch) => acc + match.homeTeamGoals, 0);
  }

  static createGoalsOwn(matches: IMatch[]): number {
    return matches.reduce((acc: number, match: IMatch) => acc + match.awayTeamGoals, 0);
  }

  static createOrdenatedLeaderBoard(board: ILeaderBoard[]): ILeaderBoard[] {
    return board.sort((teamA: ILeaderBoard, teamB: ILeaderBoard) => {
      if (teamA.totalPoints === teamB.totalPoints) {
        return teamB.totalVictories - teamA.totalVictories
        || teamB.goalsBalance - teamA.goalsBalance
        || teamB.goalsFavor - teamA.goalsFavor
        || teamB.goalsOwn - teamA.goalsOwn;
      }
      return teamB.totalPoints - teamA.totalPoints;
    });
  }

  static createBoard(matchesById: IMatch[]): Partial<ILeaderBoard> {
    const totalGames = matchesById.length;
    const totalVictories = this.createTotalVictories(matchesById);
    const totalDraws = this.createTotalDraws(matchesById);
    const totalLosses = this.createTotalLosses(matchesById);
    const goalsFavor = this.createGoalsFavor(matchesById);
    const goalsOwn = this.createGoalsOwn(matchesById);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  }

  async createLeaderBoard(): Promise<ILeaderBoard | null> {
    const teams = await this.teamModel.getAllTeams();

    const leaderBoard = await Promise.all(teams?.map(async (team: ITeam) => {
      const matchesById = await this.model.getMatchHomeTeam(Number(team.id));
      const createBoard = LeaderBoardService.createBoard(matchesById);
      return {
        name: team.teamName,
        ...createBoard,
      };
    }));

    LeaderBoardService.createOrdenatedLeaderBoard(leaderBoard as unknown as ILeaderBoard[]);

    return leaderBoard as unknown as ILeaderBoard;
  }
}

export default LeaderBoardService;
