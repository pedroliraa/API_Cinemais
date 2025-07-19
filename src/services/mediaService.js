import { v4 as uuidv4 } from 'uuid'
import { insereMedia, getMedias, getMediaByID } from '../db/memoryDB.js'

//função do service para criar nova media (chama função do memoryDb)
export async function createNewMedia(mediaData){

    await validaMedias(mediaData) //chama função para validar os dados

    const newMedia = { id: uuidv4(), ...mediaData}

    insereMedia(newMedia)

    return newMedia
}

//função para pegar todo o catálogo
export async function getMediasCatalogo(){

    return getMedias()
}

//chama função do memoryDB para buscar por ID
export async function getMediabyID(id){

    return getMediaByID(id)
}

//função para validar os dados inseridos pelo user
async function validaMedias(data){

    //validações se os campos obrigatórios estão preenchidos

    if(!data.title || typeof data.title !== 'string' || data.title.trim() === ''){ //valida title
        
        throw new Error("Por favor, o campo 'Título' não pode estar vazio")

    }

    if(!data.description || typeof data.description !== 'string' || data.description.trim() === ''){ //valida descriptrion
        
        throw new Error("Por favor, o campo 'Descrição' não pode estar vazio")

    }

    if(!data.genre || typeof data.genre !== 'string' || data.genre.trim() === ''){ //valida genre
        
        throw new Error("Por favor, o campo 'Gênero' não pode estar vazio")

    }

    //validação de type, se é movie ou series

    if (data.type !== 'movie' && data.type !== 'series'){

        throw new Error("Por favor, o campo 'Tipo' deverá ser 'movie' ou 'series'")
    }

    //validação do ano

    const anoAtual = new Date().getFullYear()

    if(typeof data.releaseYear !== 'number' || !Number.isInteger(data.releaseYear || data.releaseYear < 1900 || data.releaseYear > anoAtual )){
        
        throw new Error ("Por favor, o ano deve ser um número inteiro entre 1900 e o ano atual")

    }
}