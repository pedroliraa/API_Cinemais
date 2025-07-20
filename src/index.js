import dotenv from 'dotenv'
import buildApp from "./app.js"
import { conexaoMongo } from "./db/mongoConnection.js"

dotenv.config()

const PORTA = Number(process.env.PORT) || 3000
const HOST = '0.0.0.0'

async function start() {
    
    //conexão mongo
    try {

        await conexaoMongo()

    } catch (err) {

        console.error("Falha ao conectar no banco. Encerrando.")
        process.exit(1)

    }

    //sobe fastify
    const app = buildApp()

    try {

        await app.listen({ port: PORTA, host: HOST })
        console.log(`API funcionando na porta ${PORTA}`)

    } catch (erro) {

        console.error('Erro ao iniciar servidor: ', erro)
        process.exit(1)
    }
}

start()