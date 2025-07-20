/**
 * Armazenamento em memória temporário
 * Validação e geração de ID estarão no service mediaService.js
 * todas as medias criadas na rota POSt /media
 */

//---------------MEDIAS-----------------//

let catalogoMedias = []


//função para inserir nova media no array em memória 
export function insereMedia(mediaObj) {

    catalogoMedias.push(mediaObj)
    return mediaObj

}

//função para retornar todas as medias
export function getMedias() {

    return [...catalogoMedias]

}

//função que retorna media por id
export function getMediaByID(id) {

    return catalogoMedias.find(m => m.id === id) ?? null

}

//---------------JTEST-----------------//

export function resetMedias() {

    catalogoMedias = []

}

export function seedMedias(initialData = []) {

    catalogoMedias = [...initialData]

}