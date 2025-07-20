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

/**
 * Armazenamento em memória temporário
 * MediaID no favoritos do usuário sem duplicar 
 */

//--------------FAVORITES--------------//

let favoritesPorUser = new Map()

//função para adicionar novo favorito para o usuário do userID
export function addFavorite(userId, mediaId) {

    let favs = favoritesPorUser.get(userId)

    if (!favs) {

        favs = new Set()
        favoritesPorUser.set(userId, favs)

    }

    const sizeAntes = favs.size
    favs.add(mediaId)

    return favs.size > sizeAntes //retorna true se foi adicionado e false se não, para fazermos a validação do reply para o user

}

//função para remover favoritee do user
export function removeFavorite(userId, mediaId) {

    const favs = favoritesPorUser.get(userId)

    //checa se existe favorites para esse user
    if (!favs) {

        return false
    }

    const removed = favs.delete(mediaId)

    //remove usuário se a lista de favorites dele zerar
    if (favs.size === 0) {

        favoritesPorUser.delete(userId)
    }

    return removed; //true se removeu e false não foi encontrada a media
}

//função para chamar todos os favorites do usuário com o array media completo (title, description...)
export function getUserFavorites(userId) {

    const ids = favoritesPorUser.get(userId)

    if(!ids) return []

    return[...ids]
        .map(mid => catalogoMedias.find(m => m.id === mid) || null)
        .filter(Boolean) //se a media foi apagada do catálogo remove da lista de favorites do User
}


//--------------FAVORITES--------------//

//---------------JEST-----------------//

/*---------Medias Jest-----------*/

export function resetMedias() {

    catalogoMedias = []

}

export function seedMedias(initialData = []) {

    catalogoMedias = [...initialData]

}

/*---------Medias Jest---------*/

/*------Favorites Jest---------*/

export function resetFavorites(){

    favoritesPorUser = new Map()
}

export function seedFavorites(obj = {}){

    favoritesPorUser = new Map()

    for(const [userId, arr] of Object.entries(obj)){

        favoritesPorUser.set(userId, new Set(arr))
    }
}

/*------Favorites Jest---------*/

//---------------JEST-----------------//