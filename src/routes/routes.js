import { createMediaC, getMediasByIdC, getMediasC } from "../controllers/controller_Medias.js"

async function mediaRoutes(fastify, options) {
    fastify.post('/media', createMediaC)
    fastify.get('/media', getMediasC)
    fastify.get('/media/:id', getMediasByIdC)
}

export default mediaRoutes