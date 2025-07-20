import { createNewMedia, getMediabyID, getMediasCatalogo } from "../src/services/mediaService.js"
import { resetMedias, seedMedias, getMedias } from "../src/db/memoryDB.js"

//--------------TESTES DO MEDIA SERVICE----------------//

describe('MediaService', () => {

    //Funções de auxílio para limpar e criar dados inputados
    beforeEach(() => {
        resetMedias()
        seedMedias([
            {
                id: '1',
                title: 'Sandman',
                description: 'Série mística sobre o Endless Dream',
                type: 'series',
                releaseYear: 2022,
                genre: 'Ficção'
            },
            {
                id: '2',
                title: 'Luca',
                description: 'Filme sobre uma criança marítima descobrindo um novo mundo na superfície',
                type: 'movie',
                releaseYear: 2021,
                genre: 'Animação'
            }
        ])
    })

    // ----------------CREATE NEW MEDIA----------------//
    describe('createNewMedia', () => {

        // Cria uma media válida
        it('cria uma media com sucesso', async () => {
            const media = {
                title: "O curioso caso de Benjamim Button",
                description: 'Um homem que nasceu velho e fica novo a medida que os anos passam',
                type: 'movie',
                releaseYear: 2008,
                genre: 'Drama'
            }

            const result = await createNewMedia(media)
            expect(result).toHaveProperty("id")
            expect(result.title).toBe(media.title)

            const catalogo = getMedias()
            expect(catalogo).toHaveLength(3)
        })

        //-----Campos obrigatórios-----//
        it('falha se o título estiver vazio', async () => {
            const media = {
                title: "",
                description: 'Description',
                type: 'movie',
                releaseYear: 2001,
                genre: 'Genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/Título/)
        })

        it('falha se a descrição estiver vazia', async () => {
            const media = {
                title: "Title",
                description: '',
                type: 'movie',
                releaseYear: 2001,
                genre: 'Genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/Descrição/)
        })

        it('falha se o gênero estiver vazio', async () => {
            const media = {
                title: "title",
                description: 'Description',
                type: 'movie',
                releaseYear: 2001,
                genre: ''
            }
            await expect(createNewMedia(media)).rejects.toThrow(/Gênero/)
        })

        it("falha se type estiver vazio", async () => {
            const media = {
                title: "title",
                description: 'description',
                type: '',
                releaseYear: 2001,
                genre: 'genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/Tipo/)
        })

        it('falha se ano estiver vazio', async () => {
            const media = {
                title: 'title',
                description: 'description',
                type: 'movie',
                releaseYear: undefined, // ou null
                genre: 'genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/ano/i)
        })

        // ----- Validação do type -----
        it("falha se type não for 'movie' ou 'series'", async () => {
            const media = {
                title: "title",
                description: 'Description',
                type: 'documentary',
                releaseYear: 2001,
                genre: 'genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/Tipo/)
        })

        // ----- Validação do ano -----
        it('falha se ano < 1900', async () => {
            const media = {
                title: "title",
                description: 'Description',
                type: 'movie',
                releaseYear: 1800,
                genre: 'genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/ano/i)
        })

        it('falha se ano > ano atual', async () => {
            const futuro = new Date().getFullYear() + 1
            const media = {
                title: "Title",
                description: 'Description',
                type: 'movie',
                releaseYear: 2026,
                genre: 'Genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/ano/i)
        })

        it('falha se ano for decimal', async () => {
            const media = {
                title: "Title",
                description: 'Description',
                type: 'movie',
                releaseYear: 2025.2,
                genre: 'Drama'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/ano/i)
        })

        it('falha se ano vier como string (service espera número)', async () => {
            // o controller converte string para number
            // mas aqui estamos testando o service puro
            // @ts-ignore se estiver usando TS
            const media = {
                title: "title",
                description: 'Description',
                type: 'movie',
                releaseYear: "2008",
                genre: 'genre'
            }
            await expect(createNewMedia(media)).rejects.toThrow(/ano/i)
        })

        // ----- Limites válidos -----
        it('aceita ano 1900 (limite inferior)', async () => {
            const media = {
                title: "title",
                description: 'description',
                type: 'movie',
                releaseYear: 1900,
                genre: 'Genre'
            }
            const result = await createNewMedia(media)
            expect(result.releaseYear).toBe(1900)
        })

        it('aceita ano atual (limite superior)', async () => {
            const current = new Date().getFullYear()
            const media = {
                title: "title",
                description: 'description',
                type: 'movie',
                releaseYear: 2025,
                genre: 'genre'
            }
            const result = await createNewMedia(media)
            expect(result.releaseYear).toBe(current)
        })
    })

    // ---------------- GET CATALOGO ----------------
    describe('getMediasCatalogo', () => {

        it('retorna todas as mídias seedadas', async () => {
            const medias = await getMediasCatalogo()
            expect(medias).toHaveLength(2)
            expect(medias[0].title).toBe('Sandman')
        })

        it('retorna novas medias após criação', async () => {
            await createNewMedia({
                title: "Nova media 1",
                description: "desc 1",
                type: "movie",
                releaseYear: 2010,
                genre: "Ação"
            })
            await createNewMedia({
                title: "Nova Media 2",
                description: "desc",
                type: "series",
                releaseYear: 2015,
                genre: "Drama"
            })
            const medias = await getMediasCatalogo()
            expect(medias).toHaveLength(4) 
        })
    })

    // ---------------- GET BY ID ----------------
    describe('getMediabyID', () => {

        it('retorna mídia correta pelo id', async () => {
            const media = await getMediabyID('2')
            expect(media).not.toBeNull()
            expect(media.title).toBe("Luca")
        })

        it('retorna null se a mídia não existir', async () => {
            const media = await getMediabyID('id-inexistente')
            expect(media).toBeNull()
        })
    })
})

//--------------TESTES DO MEDIA SERVICE----------------//

//----------------TESTES DO FAVORITES-----------------//

//----------------TESTES DO FAVORITES-----------------//
