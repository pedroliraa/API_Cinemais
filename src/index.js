import buildApp from "./app.js"
import dotenv from 'dotenv'

dotenv.config()

const app = buildApp()
const PORTA = process.env.PORT //pode criar um .env ou só ajustar o número da porta aqui

app.listen({ port: PORTA, host: '0.0.0.0' })
    .then(() => console.log(`API funcionando na porta ${PORTA}`))
    .catch(erro => {
        console.error('Erro ao iniciar servirdor: ', erro)
        process.exit(1)
    })