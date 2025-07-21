# API Cinemais

A **API Cinemais** é uma aplicação desenvolvida para gerenciar um catálogo de mídias (filmes e séries) e favoritos de usuários.  
Ela foi construída utilizando **Node.js**, na linguagem **JavaScript**, com o framework **Fastify** e **MongoDB** como banco de dados, com suporte para execução via **Docker Compose** e testes realizados utilizando **Jest**.

---

## Tecnologias e Justificativa

- **JavaScript**: Embora seja muito parecido com TypeScript (que foi sugerido no teste), optei por usar JavaScript, pois é a linguagem que tenho maior domínio e uso no dia a dia.
- **Fastify**: Escolhido pela performance e por ter sintaxe parecida com o Express, com o qual já estou familiarizado.
- **MongoDB + Mongoose**: Banco não relacional, flexível e fácil de integrar com Node.js, além de já ter experiência prévia com ele.
- **Docker**: Facilita a configuração do ambiente, garantindo portabilidade entre máquinas.
- **Jest + mongodb-memory-server**: Permite testes isolados sem necessidade de um banco real, acelerando os testes.

---

## Banco de Dados

Utilizei **MongoDB** (com Mongoose) pois:
- É um banco de dados não-relacional, ideal para dados flexíveis.
- A integração com Node.js via Mongoose é prática e robusta.
- Fácil containerização com Docker.

---

## Pré-requisitos

- **Node.js** (v18+)
- **npm**
- **Docker** e **Docker Compose**

---

## Estrutura do Projeto

src/
   controllers/      # Controladores de rotas
   models/           # Modelos Mongoose (Media, Favorite)
   routes/           # Rotas da API
   services/         # Lógica de negócio (MediaService, FavoritesService)
   index.js          # Entrada principal da API
   app.js            # Instancia e configura o servidor
tests/               # Testes com Jest
Dockerfile           # Configuração do container da aplicação
docker-compose.yml   # Orquestração com MongoDB
package.json         # Configurações e dependências do projeto
README.md            # Documentação do projeto

## Como Executar

### Clonar o Repositório

```bash
git clone https://github.com/pedroliraa/API_Cinemais.git
```

```powershell
cd API_Cinemais
npm install
```

---
#### Executar com Docker (recomendado)

```powershell
docker compose up --build
```

- API Disponível em: **http://localhost:3000/**

---

#### Executar sem Docker

Para rodar sem Docker, é necessário ter o **MongoDB** instalado localmente e criar um arquivo `.env` com:

```bash
MONGO_URI=mongodb://localhost:27017/cinemais
PORT=3000
```

E então executar:
```powershell
npm start
```

## Testes

Os testes foram feitos utilizando o stack **Jest** e usam **mongodb-memory-server** para criar um banco de dados temporário em memória

- Para rodar:

```powershell
npm test
```

## Endpoints

### Medias Endpoints

#### POST /media

```bash
 curl --request POST \
  --url http://localhost:3000/media \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.2.0' \
  --data '{
  "title": "Titanic",
  "description": "Filme de época sobre um romance a bordo do navio Titanic",
  "type": "movie",
  "releaseYear": 1997,
  "genre": "Romance de época"
}'   
```

#### GET /media

```bash
curl --request GET \
  --url http://localhost:3000/media \
  --header 'User-Agent: insomnia/11.2.0'
```

#### GET /media/{id}

```bash
curl --request GET \
  --url http://localhost:3000/media/687d663e32f3078d735dc900 \
  --header 'User-Agent: insomnia/11.2.0'
```

### Favorites Endpoints

#### POST /users/{userId}/favorites

```bash
curl --request POST \
  --url http://localhost:3000/users/user1/favorites \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.2.0' \
  --data '{
	"mediaId": "687d6c5e92b3d95f9c6eb2e1"
}'
```

#### GET /users/{userId}/favorites

```bash
curl --request GET \
  --url http://localhost:3000/users/user1/favorites \
  --header 'User-Agent: insomnia/11.2.0'
```

#### DELETE users/{userId}/favorites/{mediaId}

```bash
curl --request DELETE \
  --url http://localhost:3000/users/user1/favorites/687d6c5e92b3d95f9c6eb2e1 \
  --header 'User-Agent: insomnia/11.2.0'
  ```