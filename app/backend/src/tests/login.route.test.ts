import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UsersModel from '../database/models/UsersModel';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

const LOGIN_USER_MOCK = {
  id: 1,
  username: 'User',
  role:'user',
  email: 'user@user.com',
  password: 'secret_user' 
}

const TOKEN_MOCK = {
  token: 'jkdsfhasdfbasjdhfgasjfasdhasdfgasdiufgyasdofasdoyu',
}

const MESSAGE_EMAIL_INVALID = '"email" must be a valid email';
const MESSAGE_PASSWORD_INVALID = '"password" length must be at least 6 characters long';
const UNAUTHORIZED = 'Incorrect email or password';

describe('Teste a rota de login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves(LOGIN_USER_MOCK as UsersModel);
  });

  after(()=>{
    (UsersModel.findOne as sinon.SinonStub).restore();
  })

  it('Teste se ao logar com email no formato invalido retorna 400 e "email" must be a valid email ', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'email': 'useruser.com',
        'password': 'secret_user',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_EMAIL_INVALID);
  });

  it('Teste se ao logar com passsword com menos de 6 caracteres retorna 400 e a mensagem "password" length must be at least 6 characters long ', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'email': 'user@user.com',
        'password': 'secr',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_PASSWORD_INVALID);
  });

  // it('Teste se ao logar com sucesso retorna 200 e o token', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app).post('/login').send({
  //       'email': 'user@user.com',
  //       'password': 'secret_user',
  //      });

  //   expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
  //   expect(chaiHttpResponse.body.message).to.be.eql(TOKEN_MOCK);
  // });
});

