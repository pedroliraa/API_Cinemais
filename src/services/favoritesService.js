import Favorite from '../models/Favorites.js'
import { getMediasCatalogo } from './mediaService.js'
import Media from '../models/Media.js'
import mongoose from 'mongoose'

export async function addFavoriteServ(userId, mediaId) {
    await validaFavorite(userId, mediaId)

    //Checa se já existe o favorito para não duplicar
    const exists = await Favorite.findOne({ userId, mediaId })

    if (!exists) {
        await Favorite.create({ userId, mediaId })
    }

    return getUserFavoritesServ(userId)
}

export async function removeFavoriteServ(userId, mediaId) {
    await validaFavorite(userId, mediaId, false)

    await Favorite.deleteOne({ userId, mediaId })

    return getUserFavoritesServ(userId)
}

export async function getUserFavoritesServ(userId) {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error(
            "Por favor, o campo 'userId' é obrigatório e deve ser no formato texto"
        );
    }

    const favorites = await Favorite.aggregate([
        { $match: { userId } },
        {
            $lookup: {
                from: Media.collection.name,         
                localField: 'mediaId',
                foreignField: '_id',
                as: 'mediaInfo',
            },
        },
        { $unwind: '$mediaInfo' },

        { $replaceRoot: { newRoot: '$mediaInfo' } },
    ]);

    return favorites
}

async function validaFavorite(
    userId,
    mediaId = undefined,
    checarExistencia = true
) {
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error(
            "Por favor, o campo 'userId' é obrigatório e deve ser no formato texto"
        );
    }

    if (mediaId !== undefined) {
        if (!mediaId || typeof mediaId !== 'string' || mediaId.trim() === '') {
            throw new Error(
                "Por favor, o campo 'mediaId' é obrigatório e deve ser no formato texto"
            );
        }

        if (checarExistencia) {
            // Aqui consultamos o catálogo de mídias no mongo

            const catalogo = await getMediasCatalogo()
            const mediaExiste = catalogo.some(
                (media) => media._id.toString() === mediaId
            );

            if (!mediaExiste) {
                throw new Error(`A media com id '${mediaId}' não existe no catálogo`)
            }
        }
    }
}
