import * as sinon from 'sinon';
import * as chai from 'chai';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModels';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

const MESSAGE_TEAMS_NOT_FOUND = 'Teams not found';

let chaiHttpResponse: Response;

describe('Teste a rota teams com dados no banco de dados', () => {

  const TEAMS_MOCK = [{
    id: 1,
    teamName: 'Avaí',
  }];

  before(() => {
    return sinon
      .stub(TeamsModel, "findAll")
      .resolves(TEAMS_MOCK as TeamsModel[]);
  });

  after(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('Teste se houver times cadastrados na rota retorna um array com id e nome do time', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    expect(chaiHttpResponse.body).to.be.eql(TEAMS_MOCK);
  });
});

describe('Teste a rota teams sem dados no banco de dados', () => {

  before(() => {
    return sinon
      .stub(TeamsModel, "findAll")
      .resolves([]);
  });

  after(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
  })

  it('Teste se nao houver nenhum time cadastrado, lança uma exceção com status 404', async () => {

    try {
      chaiHttpResponse = await chai
         .request(app).get('/teams');  
    } catch (error) {
      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.NOT_FOUND);
      expect(chaiHttpResponse.body.message).to.be.equal(MESSAGE_TEAMS_NOT_FOUND);    
    }    

  });
});