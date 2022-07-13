import * as express from 'express';
import * as cors from 'cors';
import LoginRouter from './routes/loginRoutes';
import TeamsRouter from './routes/teams.routes';
import errorMiddleware from './middlewares/errorHandler';
import MatchesRouter from './routes/matches.routes';
import LeaderBoardRouter from './routes/leaderboard.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(LoginRouter);
    this.app.use(TeamsRouter);
    this.app.use(MatchesRouter);
    this.app.use(LeaderBoardRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
