import MediaModel from '../models/Media.js'

//cria uma nova mídia
export async function createNewMedia(mediaData) {

    validaMedias(mediaData)

    const newMedia = await MediaModel.create(mediaData)

    return newMedia
}

//retorna todo o catálogo
export async function getMediasCatalogo() {

    return MediaModel.find()
}

//busca mídia pelo ID
export async function getMediabyID(id) {

    return MediaModel.findById(id)
}

//valida os campos da mídia
export function validaMedias(data) {

    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {

        throw new Error("Por favor, o campo 'Título' não pode estar vazio")
    }

    if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {

        throw new Error("Por favor, o campo 'Descrição' não pode estar vazio")
    }

    if (!data.genre || typeof data.genre !== 'string' || data.genre.trim() === '') {

        throw new Error("Por favor, o campo 'Gênero' não pode estar vazio")
    }

    if (!data.type || typeof data.type !== 'string' || data.type.trim() === '') {

        throw new Error("Por favor, o campo 'Tipo' não pode estar vazio")
    }

    if (data.releaseYear === undefined || data.releaseYear === null) {

        throw new Error("Por favor, o campo 'Ano de lançamento' não pode estar vazio")
    }

    if (data.type !== 'movie' && data.type !== 'series') {

        throw new Error("Por favor, o campo 'Tipo' deverá ser 'movie' ou 'series'")
    }

    const anoAtual = new Date().getFullYear()

    if (typeof data.releaseYear !== 'number' || !Number.isInteger(data.releaseYear) || data.releaseYear < 1900 || data.releaseYear > anoAtual) {

        throw new Error("Por favor, o ano deve ser um número inteiro entre 1900 e o ano atual")
    }
}
