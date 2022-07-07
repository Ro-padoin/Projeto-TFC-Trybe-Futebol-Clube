import { Router } from 'express';
import Repository from '../repositoryModel/Login';
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
  console.log('oi');
  entityFactory().login(req, res, next);
});

export default LoginRouter;
