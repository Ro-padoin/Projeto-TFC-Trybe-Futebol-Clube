# Projeto Trybe Futebol CLube!

<h3> O `TFC` é um site informativo sobre partidas e classificações de futebol! </h3>

<br/>

## Descricao do Projeto

Projeto desenvolvido no bloco 28 - Modulo 3 - Desenvolvimento em BackEnd na turma 17 - Trybe. Conteudos aplicados: Typescript, POO, SOLID, Node, Camadas - arquitetura MSC, Api REST e Sequelize com Typescript.

<br/>

## Desenvolvimento

- Desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

- Construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Respeitando as regras de negócio providas no projeto e **sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto**.

- Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. 

- Tem um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

- O back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

Oservações: 

- O Frontend e o Docker Compose foi fornecido pela Trybe, criamos o DockerFile do Backend e Frontend e ajustamos as configuracoes do Docker Compose;
- O desenvolvimento de todo o projeto se encontra dentro da pasta `app/backend/src`.

<br/>

## Habilidades desenvolvidas

- A realização da dockerização dos apps, network, volume e compose;
- A modelagem de dados com MySQL através do Sequelize;
- A criação e associação de tabelas usando models do sequelize;
- A construção de uma API REST com endpoints para consumir os models criados;
- A construção de um CRUD com TypeScript, utilizando ORM,
- Aplicacao de testes de integracao com cobertura de 80%.

<br/>

## Tecnologias utilizadas

- Typescript;
- Docker, Docker Compose;
- Node.js;
- Sequelize com Typescript;
- Mysql;
- JsonWebToken;
- Bcrypt-js;
- Testes com mocha, chai e sinon em Typescript;
- Eslint;
- Joi;
- POO.

<br/>

## Colaboradores

Projeto realizado individualmente.

<br/>

## Status

Finalizado.

<br/>

## Desempenho

100% nos requisitos totais.

<br/>


# Requisitos


## Requisito Obrigatórios

### Esse projeto é composto de 4 seções principais:
1. User e Login
2. Times
3. Partidas
4. Placar 

---
 
### (`TDD`) Desenvolva testes que cubram no mínimo 10% dos arquivos back-end em `/src`, com um mínimo de 19 linhas cobertas

---

### (`TDD`) Desenvolva testes que cubram no mínimo 5% dos arquivos back-end em `/src`, com um mínimo de 7 linhas cobertas

---

### (`TDD`) Desenvolva testes que cubram no mínimo 15% dos arquivos back-end em `/src`, com um mínimo de 25 linhas cobertas

---

### (`TDD`) Desenvolva testes que cubram no mínimo 20% dos arquivos back-end em `/src`, com um mínimo de 35 linhas cobertas

---

### (`TDD`) Desenvolva testes que cubram no mínimo 30% dos arquivos back-end em `/src`, com um mínimo de 45 linhas cobertas

---

### (`TDD`) Desenvolva testes que cubram no mínimo 45% dos arquivos back-end em `/src`, com um mínimo de 70 linhas cobertas

---

### (`TDD`) Desenvolva testes que cubram no mínimo 60% dos arquivos back-end em `/src`, com um mínimo de 80 linhas cobertas

---

### Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela `users`

---

### Desenvolva o endpoint `POST /login`

---

### Desenvolva o endpoint `GET /login/validate`

---

### Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `teams`

---

### Desenvolva o endpoint `GET /teams`

---

### Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de `matches`

---

### Desenvolva o endpoint `GET /matches`

---

### Desenvolva a rota `POST /matches`

---

### Desenvolva a rota ` PATCH /matches/:id/finish`

---

### Desenvolva o endpoint ` PATCH /matches/:id`

---

### Desenvolva o endpoint `GET /leaderboard/home`

---

### Desenvolva o endpoint ` GET /leaderboard/away`

---

### Desenvolva o endpoint `GET /leaderboard`

---

## Requisito Bônus

### Desenvolva testes que cubram no mínimo 80% dos arquivos back-end em `/src`, com um mínimo de 100 linhas coberta

---
