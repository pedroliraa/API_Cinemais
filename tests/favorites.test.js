import { addFavoriteServ, removeFavoriteServ, getUserFavoritesServ } from "../src/services/favoritesService.js"
import { resetFavorites, resetMedias, insereMedia } from "../src/db/memoryDB.js"

describe('FavoritesService', () => {

    //inserindo medias para os testes
    beforeEach(() => {

        //garantindo que esteja tudo limpo
        resetFavorites()
        resetMedias()

        insereMedia({
            id: '1',
            title: 'Titanic',
            description: 'Filme de época sobre navio naufragado',
            type: 'movie',
            releaseYear: 1997,
            genre: 'Romance de época'
        })

        insereMedia({
            id: '2',
            title: 'Sandman',
            description: 'Série baseada nos quadrinhos de mesmo nome',
            type: 'series',
            releaseYear: 2022,
            genre: 'Ficção'
        })
    })

    //-----------Adição de Favorito----------//
    describe('addFavoriteServ', () => {

        it('adiciona um favorito corretamente', async () => {
            const result = await addFavoriteServ('user1', '1')
            expect(result).toHaveLength(1)
            expect(result[0].id).toBe('1')
        })

        it('adiciona múltiplos favoritos para o mesmo usuário', async () => {
            await addFavoriteServ('user1', '1')
            const result = await addFavoriteServ('user1', '2')
            expect(result).toHaveLength(2)
            expect(result.map(m => m.id)).toEqual(expect.arrayContaining(['1', '2']))
        })

        //--------Campos Obrigatórios-----------//
        it('lança erro se userId não for string válida', async () => {
            await expect(addFavoriteServ('', '1')).rejects.toThrow(/userId/)
            await expect(addFavoriteServ(null, '1')).rejects.toThrow(/userId/)
        })

        it('lança erro se mediaId não for string válida', async () => {
            await expect(addFavoriteServ('user1', '')).rejects.toThrow(/mediaId/)
            await expect(addFavoriteServ('user1', null)).rejects.toThrow(/mediaId/)
        })

        //Valida se existe
        it('lança erro se mediaId não existir no catálogo', async () => {
            await expect(addFavoriteServ('user1', '999')).rejects.toThrow(/não existe/)
        })

    })

    //--------Teste Pega favoritos----------//
    describe('getUserFavoritesServ', () => {

        it('retorna favoritos do usuário', async () => {
            await addFavoriteServ('user1', '1')
            await addFavoriteServ('user1', '2')
            const favorites = await getUserFavoritesServ('user1')
            expect(favorites).toHaveLength(2)
            expect(favorites[0]).toHaveProperty('id')
        })

        //------Campos obrigatórios/inválidos-----------//
        it('retorna array vazio se usuário não tiver favoritos', async () => {
            const favorites = await getUserFavoritesServ('user2')
            expect(favorites).toEqual([])
        })

        it('lança erro se userId inválido', async () => {
            await expect(getUserFavoritesServ('')).rejects.toThrow(/userId/)
        })
    })

    //-----------Teste remoção Favorito--------//
    describe('removeFavoriteServ', () => {

        it('remove favorito corretamente', async () => {
            await addFavoriteServ('user1', '1')
            const afterAdd = await getUserFavoritesServ('user1')
            expect(afterAdd).toHaveLength(1)

            const afterRemove = await removeFavoriteServ('user1', '1')
            expect(afterRemove).toEqual([])
        })

        //Valida campos e existência
        it('não lança erro ao tentar remover favorito inexistente', async () => {
            await addFavoriteServ('user1', '1')
            const result = await removeFavoriteServ('user1', '999')
            expect(result).toHaveLength(1)  // permanece o favorito existente
        })

        it('lança erro se userId ou mediaId inválidos', async () => {
            await expect(removeFavoriteServ('', '1')).rejects.toThrow(/userId/)
            await expect(removeFavoriteServ('user1', '')).rejects.toThrow(/mediaId/)
        })
    })

})