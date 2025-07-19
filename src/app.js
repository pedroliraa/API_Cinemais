import fastify from 'fastify'
export default buildApp

function buildApp(){
    
    const app = fastify({logger:true}) //log ativo

    app.get('/health', async () => ({status:'ok'})) //teste para ver se o servidor esta no ar

    return app;

}