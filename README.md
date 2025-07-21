# API Cinemais

## Descrição
A **API Cinemais** é uma aplicação REST para gerenciar um catálogo de mídias (filmes e séries) e favoritos de usuários.  
Permite criar novas mídias, consultar o catálogo, adicionar/remover favoritos e buscar os favoritos de cada usuário.

---

## Justificativas Técnicas
### **Framework**
A API foi desenvolvida utilizando **Fastify** devido à sua:
- Alta performance em comparação a outros frameworks como Express.
- Sintaxe simples e suporte nativo a JSON.
- Facilidade na criação de rotas e integração com middlewares.

### **Banco de Dados**
Foi utilizado **MongoDB** (com Mongoose) porque:
- É um banco de dados não-relacional, adequado para dados sem esquema fixo.
- Permite integração rápida com Node.js através do Mongoose.
- Fácil de containerizar com Docker, mantendo um ambiente de desenvolvimento consistente.

---

## **Pré-requisitos**
- **Node.js** (v18+ recomendado).
- **npm** (geralmente já vem com Node).
- **Docker** e **Docker Compose**

---

## **Instalação e Execução**
### **Sem Docker**
```bash
git clone https://github.com/pedroliraa/API_Cinemais.git
cd API_Cinemais
npm install
npm start
