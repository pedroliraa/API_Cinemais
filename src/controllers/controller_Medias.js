import { createNewMedia, getMediabyID, getMediasCatalogo } from "../services/mediaService.js"

//função do controller para criar nova media
export async function createMediaC(request, reply){

    let {
        title,
        description,
        type,
        releaseYear,
        genre
    } = request.body

    releaseYear = Number(releaseYear)

    let mediaData = {title, description, type, releaseYear, genre}

    try {

        const response = await createNewMedia(mediaData) //chama a função do service para criar a nova media no catálogo

         return reply.code(201).send(response) //retorna o code 201 e o objeto media que foi criado

    } catch (error) {

        return reply.code(400).send({message: error.message}) //mensagem de erro
        
    }
}


export async function getMediasC(request, reply){

    try {

        const responseLista = await getMediasCatalogo()

        return reply.code(200).send(responseLista) //retorna as medias
        
    } catch (error) {

        console.log("Erro: ", error)
        
        return reply.code(500).send({message: "Internal Server Error"}) //mensagem de erro para averiguar se a chamada da função do service teve algum problema
    }
}


//pegar todas as medias do catálogo
export async function getMediasByIdC(request, reply){

    const {id} = request.params

    //console.log("Id recebido: ", id)

    try {

        const responseMedia = await getMediabyID(id)

        if(!responseMedia){

            return reply.code(404).send({message: "Media não encontrada"})

        }else{

            return reply.code(200).send(responseMedia) //retorna a media com o ID requisitado
        }
        
    } catch (error) {

        console.log("Erro: ", error)
        
        return reply.code(500).send({message: "Internal Server Error"}) //mensagem de erro para averiguar se a chamada da função do service teve algum problema

    }
}