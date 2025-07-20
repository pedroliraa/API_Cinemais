import { addFavorite, removeFavorite, getUserFavorites, getMedias } from "../db/memoryDB.js";

//adiciona novo mediaId ao favorites do user
export async function addFavoriteServ(userId, mediaId) {

    validaFavorite(userId, mediaId)
    addFavorite(userId, mediaId)

    return getUserFavorites(userId)
}

export async function removeFavoriteServ(userId, mediaId) {

    validaFavorite(userId, mediaId)
    removeFavorite(userId, mediaId)

    return getUserFavorites(userId)
}

export async function getUserFavoritesServ(userId) {

    validaFavorite(userId)
    return getUserFavorites(userId)

}

function validaFavorite(userId, mediaId = null) {

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error("Por favor, o campo 'userId' é obrigatório e deve ser no formato texto");
    }

    if (mediaId !== null) {
        if (!mediaId || typeof mediaId !== 'string' || mediaId.trim() === '') {
            throw new Error("Por favor, o campo 'mediaId' é obrigatório e deve ser no formato texto");
        }

        const catalogo = getMedias();
        const mediaExiste = catalogo.some(media => media.id === mediaId);

        if (!mediaExiste) {
            throw new Error(`A media com id '${mediaId}' não existe no catálogo`);
        }
    }
}