import { addFavorite, removeFavorite, getUserFavorites, getMedias } from "../db/memoryDB.js";

//adiciona novo mediaId ao favorites do user
export async function addFavoriteServ(userId, mediaId) {

    validaFavorite(userId, mediaId)
    addFavorite(userId, mediaId)

    return getUserFavorites(userId)
}

//remove favorito
export async function removeFavoriteServ(userId, mediaId) {

    validaFavorite(userId, mediaId, false)
    removeFavorite(userId, mediaId)

    return getUserFavorites(userId)
}

//pega toda lista de favoritos do user
export async function getUserFavoritesServ(userId) {

    validaFavorite(userId)
    return getUserFavorites(userId)

}

function validaFavorite(userId, mediaId = undefined, checarExistencia = true) {

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {

        throw new Error("Por favor, o campo 'userId' é obrigatório e deve ser no formato texto")
    }

    if (mediaId !== undefined) {

        if (!mediaId || typeof mediaId !== 'string' || mediaId.trim() === '') {

            throw new Error("Por favor, o campo 'mediaId' é obrigatório e deve ser no formato texto")
        }

        if (checarExistencia) {

            const catalogo = getMedias()
            const mediaExiste = catalogo.some(media => media.id === mediaId)

            if (!mediaExiste) {

                throw new Error(`A media com id '${mediaId}' não existe no catálogo`)
            }
        }
    }
}