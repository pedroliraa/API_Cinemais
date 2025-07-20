import { addFavoriteServ, removeFavoriteServ, getUserFavoritesServ } from "../services/favoritesService.js"

//colocar nova media no favorites (POST /users/{userId}/favorites)
export async function createNewUserFavoriteC(request, reply) {

    let { mediaId } = request.body

    let { userId } = request.params

    try {

        await addFavoriteServ(userId, mediaId)

        return reply.code(204).send() //se tudo ocorrer bem

    } catch (error) {

        console.error("Erro ao adicionar favorito:", error.message)//identificação de algum erro durante o processo

        //caso falte algum parametro ou esteja no formato incorreto
        if (error.message.includes("userId") || error.message.includes("mediaId")) {
            return reply.code(400).send({ message: error.message })
        }

        //caso a mídia não exista no catálogo
        if (error.message.includes("não existe no catálogo")) {

            return reply.code(404).send({ message: error.message })
        }

        //qualquer outra falha
        return reply.code(500).send({ message: "Internal Server Error" })

    }
}

//pega os favorites do usuário (GET /users/{userId}/favorites)
export async function getUserFavoritesC(request, reply) {

    let { userId } = request.params

    try {

        const favorites = await getUserFavoritesServ(userId)

        return reply.code(200).send(favorites)

    } catch (error) {

        console.error("Erro ao buscar favoritos:", error.message) //mensagem de erro no log do terminal

        if (error.message.includes("userId")) {

            return reply.code(400).send({ message: error.message }) //userId faltando ou num formato inválido
        }

        return reply.code(500).send({ message: "Internal Server Error" }) //falha inesperada

    }
}

//remove um favorite do usuário (DELETE /users/{userId}/favorites/{mediaId})
export async function removeFavoriteC(request, reply) {

    let { userId, mediaId } = request.params

    try {

        await removeFavoriteServ(userId, mediaId)

        reply.code(204).send()

    } catch (error) {

        console.error("Erro ao buscar favoritos:", error.message) //mensagem de erro no log do terminal

        if (error.message.includes("userId") || error.message.includes("mediaId")) { //userId ou mediaId faltando ou num formato inválido

            return reply.code(400).send({ message: error.message })
        }

        return reply.code(500).send({ message: "Internal Server Error" }) //falha inesperada

    }
}