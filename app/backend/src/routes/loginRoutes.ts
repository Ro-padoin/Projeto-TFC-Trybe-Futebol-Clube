import { Router } from 'express';
import Repository from '../repositoryModel/LoginRepository';
import Service from '../services/LoginService';
import Controller from '../controllers/LoginController';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new Controller(service);
  return controller;
};

const LoginRouter: Router = Router();

LoginRouter.post('/login', (req, res, next) => {
  entityFactory().login(req, res, next);
});

export default LoginRouter;
