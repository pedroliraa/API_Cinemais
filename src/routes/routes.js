import { createMediaC, getMediasByIdC, getMediasC } from "../controllers/controller_Medias.js"
import { createNewUserFavoriteC, getUserFavoritesC, removeFavoriteC } from "../controllers/controller_Favorites.js"

export async function mediaRoutes(fastify) {

    fastify.post('/media', createMediaC)
    fastify.get('/media', getMediasC)
    fastify.get('/media/:id', getMediasByIdC)

}

export async function favoritesRoutes(fastify) {

    fastify.post('/users/:userId/favorites', createNewUserFavoriteC)
    fastify.get('/users/:userId/favorites', getUserFavoritesC)
    fastify.delete('/users/:userId/favorites/:mediaId', removeFavoriteC)
}
