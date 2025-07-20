git clone https://github.com/pedroliraa/API_Cinemais.git
cd API_Cinemais
npm install

PORT=3000

npm start   
# ou
node src/index.js

Docker e Mongo adicionados

### Executar com Docker
```bash
docker compose up --build

```md
### Variáveis de ambiente
- `MONGO_URI` (opcional fora do docker). Exemplo: `mongodb://root:example@localhost:27017/cinemais?authSource=admin`