import { ILeaderBoard, ILeaderBoards, IMatch, IMatches, ITeam } from '../interfaces';
import TeamsModels from '../repositoryModel/TeamsRepository';

class LeaderBoardService implements ILeaderBoards {
  private teamModel: TeamsModels;

  constructor(private model: IMatches) {
    this.model = model;
    this.teamModel = new TeamsModels();
  }

  static createTotalVictories(matches: IMatch[], matchAttribute: string): number {
    if (matchAttribute === 'homeTeam') {
      return matches.reduce((acc: number, match: IMatch) => {
        if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    }
    return matches.reduce((acc: number, match: IMatch) => {
      if (match.awayTeamGoals > match.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  static createTotalDraws(matches: IMatch[], matchAttribute: string): number {
    if (matchAttribute === 'homeTeam') {
      return matches.reduce((acc: number, match: IMatch) => {
        if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    }
    return matches.reduce((acc: number, match: IMatch) => {
      if (match.awayTeamGoals === match.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  static createTotalLosses(matches: IMatch[], matchAttribute: string): number {
    if (matchAttribute === 'homeTeam') {
      return matches.reduce((acc: number, match: IMatch) => {
        if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    }
    return matches.reduce((acc: number, match: IMatch) => {
      if (match.awayTeamGoals < match.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  static createGoalsFavor(matches: IMatch[], matchAttribute: string): number {
    if (matchAttribute === 'homeTeam') {
      return matches.reduce((acc: number, match: IMatch) => acc + match.homeTeamGoals, 0);
    }
    return matches.reduce((acc: number, match: IMatch) => acc + match.awayTeamGoals, 0);
  }

  static createGoalsOwn(matches: IMatch[], matchAttribute: string): number {
    if (matchAttribute === 'homeTeam') {
      return matches.reduce((acc: number, match: IMatch) => acc + match.awayTeamGoals, 0);
    }
    return matches.reduce((acc: number, match: IMatch) => acc + match.homeTeamGoals, 0);
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

  static createBoard(matchesById: IMatch[], matchAttribute: string): Partial<ILeaderBoard> {
    const totalGames = matchesById.length;
    const totalVictories = this.createTotalVictories(matchesById, matchAttribute);
    const totalDraws = this.createTotalDraws(matchesById, matchAttribute);
    const totalLosses = this.createTotalLosses(matchesById, matchAttribute);
    const goalsFavor = this.createGoalsFavor(matchesById, matchAttribute);
    const goalsOwn = this.createGoalsOwn(matchesById, matchAttribute);
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

  async createLeaderBoard(matchAttribute: string): Promise<ILeaderBoard | null> {
    const teams = await this.teamModel.getAllTeams();

    const leaderBoard = await Promise.all(teams?.map(async (team: ITeam) => {
      const matchesById = await this.model.getMatchHomeTeam(Number(team.id), matchAttribute);
      const createBoard = LeaderBoardService.createBoard(matchesById, matchAttribute);
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
