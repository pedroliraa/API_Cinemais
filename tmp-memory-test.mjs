import { insereMedia, getMedias, getMediaByID } from "./src/db/memoryDB.js";

console.log("Teste array vazio: ", getMedias())

//chamando funcções para inserir medias

insereMedia({
    id: '1',
    title: "Titanic",
    description: "Filme de época sobre navio naufragado",
    type: "movie",
    releaseYear: "1997",
    genre: "Romance de época"
})

insereMedia({
    id: '2',
    title: "Sandman",
    description: "Série baseada nos quadrinhos de de mesmo nome",
    type: "series",
    releaseYear: "2022",
    genre: "Ficção"
})

//listando as medias
console.log("Catálogo completo: ", getMedias())

//pegando uma media pelo id
console.log("Media: ", getMediaByID('2'))

//busca por id inexistente
console.log("Media: ", getMediaByID('3'))