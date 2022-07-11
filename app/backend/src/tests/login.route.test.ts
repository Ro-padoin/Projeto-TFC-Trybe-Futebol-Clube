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
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const MESSAGE_EMAIL_INVALID = '"email" must be a valid email';
const MESSAGE_PASSWORD_INVALID = '"password" length must be at least 6 characters long';
const MESSAGE_FIELDS_FILLED = 'All fields must be filled';
const UNAUTHORIZED = 'Incorrect email or password';

describe('Teste a rota de login', () => {

  let chaiHttpResponse: Response;

  before(() => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves(LOGIN_USER_MOCK as UsersModel);
  });

  after(()=>{
    (UsersModel.findOne as sinon.SinonStub).restore();
  })

  it('Teste se ao logar sem email retorna status 400 e mensagem "All fields must be filled"', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'password': 'secret_user',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_FIELDS_FILLED);
  });

  it('Teste se ao logar com email com valor undefined retorna 400 e mensagem "All fields must be filled"', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'email': '',
        'password': 'secret_user',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_FIELDS_FILLED);
  });

  it('Teste se ao logar sem password retorna status 400 e mensagem "All fields must be filled"', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'email': '',
        'password': 'secret_user',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_FIELDS_FILLED);
  });

  it('Teste se ao logar com password com valor undefined retorna status 400 e mensagem "All fields must be filled"', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'email': '',
        'password': 'secret_user',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_FIELDS_FILLED);
  });

  it('Teste se ao logar com email no formato invalido retorna 422 e "email" must be a valid email ', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'email': 'useruser.com',
        'password': 'secret_user',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_EMAIL_INVALID);
  });

  it('Teste se ao logar com passsword com menos de 6 caracteres retorna 400 e a mensagem "password" length must be at least 6 characters long ', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send({
        'email': 'user@user.com',
        'password': 'secr',
       });

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_PASSWORD_INVALID);
  });

  it('Teste se ao logar com usuario nao existente no banco de dados retorna 401 e mensagem "Incorrect email or password', async () => {
    try {
      chaiHttpResponse = await chai
         .request(app).post('/login').send({
          "email": "use@user.com",
          "password": "secret_user"
        });
      } catch (error) {
        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
        expect(chaiHttpResponse.body.message).to.be.equal(UNAUTHORIZED)
      }
  });

  it('Teste se ao logar com usuario existente porem com uma senha invalida retorna 401 e mensagem "Incorrect email or password', async () => {
    try {
      chaiHttpResponse = await chai
         .request(app).post('/login').send({
          "email": "user@user.com",
          "password": "secret_use"
        });
      } catch (error) {
        expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
        expect(chaiHttpResponse.body.message).to.be.equal(UNAUTHORIZED)
      }
  });

  it('Teste se ao logar com sucesso retorna status 200 e a chave token', async () => {
        chaiHttpResponse = await chai
           .request(app).post('/login').send({
            "email": "user@user.com",
            "password": "secret_user"
          });
    expect(chaiHttpResponse.status).to.be.eql(StatusCodes.OK);
    expect(chaiHttpResponse.body).to.have.a.key('token');
  });
});

