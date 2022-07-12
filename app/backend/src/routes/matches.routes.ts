import { Router } from 'express';
import Repository from '../repositoryModel/MatchesRepository';
import Service from '../services/MatchesService';
import Controller from '../controllers/MatchesController';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);
  return controller;
};

const MatchesRouter: Router = Router();

MatchesRouter.get('/matches', (req, res, next) => {
  entityFactory().getAllMatches(req, res, next);
});

export default MatchesRouter;
