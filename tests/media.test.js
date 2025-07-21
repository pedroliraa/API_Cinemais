import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as mediaService from '../src/services/mediaService.js'
import MediaModel from '../src/models/Media.js'

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

afterEach(async () => {
  await MediaModel.deleteMany()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('MediaService com MongoDB em memória', () => {

  beforeEach(async () => {
    await MediaModel.insertMany([
      {
        title: 'Sandman',
        description: 'Série mística sobre o Endless Dream',
        type: 'series',
        releaseYear: 2022,
        genre: 'Ficção'
      },
      {
        title: 'Luca',
        description: 'Filme sobre uma criança marítima descobrindo um novo mundo na superfície',
        type: 'movie',
        releaseYear: 2021,
        genre: 'Animação'
      }
    ])
  })

  // ----- Testes de criação -----
  describe('createNewMedia', () => {

    it('cria uma media com sucesso', async () => {
      const media = {
        title: "O curioso caso de Benjamim Button",
        description: 'Um homem que nasceu velho e fica novo a medida que os anos passam',
        type: 'movie',
        releaseYear: 2008,
        genre: 'Drama'
      }
      const result = await mediaService.createNewMedia(media)
      expect(result).toHaveProperty('_id')
      expect(result.title).toBe(media.title)

      const catalogo = await mediaService.getMediasCatalogo()
      expect(catalogo).toHaveLength(3)
    })

    // Validações de campos obrigatórios
    it('falha se o título estiver vazio', async () => {
      const media = {
        title: '',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: 2001,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/Título/)
    })

    it('falha se a descrição estiver vazia', async () => {
      const media = {
        title: 'Título válido',
        description: '',
        type: 'movie',
        releaseYear: 2001,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/Descrição/)
    })

    it('falha se o gênero estiver vazio', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: 2001,
        genre: ''
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/Gênero/)
    })

    it('falha se o tipo estiver vazio', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: '',
        releaseYear: 2001,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/Tipo/)
    })

    it('falha se o tipo for inválido', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'documentary',
        releaseYear: 2001,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/Tipo/)
    })

    it('falha se o ano de lançamento for indefinido', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: undefined,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/ano/i)
    })

    it('falha se o ano de lançamento for null', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: null,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/ano/i)
    })

    it('falha se o ano for menor que 1900', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: 1800,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/ano/i)
    })

    it('falha se o ano for maior que o ano atual', async () => {
      const futureYear = new Date().getFullYear() + 1
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: futureYear,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/ano/i)
    })

    it('falha se o ano for decimal', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: 2020.5,
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/ano/i)
    })

    it('falha se o ano vier como string', async () => {
      // @ts-ignore
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: "2008",
        genre: 'Ação'
      }
      await expect(mediaService.createNewMedia(media)).rejects.toThrow(/ano/i)
    })

    // Testes limites válidos
    it('aceita o ano 1900 (limite inferior)', async () => {
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: 1900,
        genre: 'Ação'
      }
      const result = await mediaService.createNewMedia(media)
      expect(result.releaseYear).toBe(1900)
    })

    it('aceita o ano atual (limite superior)', async () => {
      const currentYear = new Date().getFullYear()
      const media = {
        title: 'Título válido',
        description: 'Descrição válida',
        type: 'movie',
        releaseYear: currentYear,
        genre: 'Ação'
      }
      const result = await mediaService.createNewMedia(media)
      expect(result.releaseYear).toBe(currentYear)
    })

  })

  // ----- Testes de leitura -----
  describe('getMediasCatalogo', () => {
    it('retorna todas as mídias seedadas', async () => {
      const medias = await mediaService.getMediasCatalogo()
      expect(medias).toHaveLength(2)
      expect(medias[0]).toHaveProperty('title')
    })

    it('retorna novas mídias após criação', async () => {
      await mediaService.createNewMedia({
        title: "Nova media 1",
        description: "desc 1",
        type: "movie",
        releaseYear: 2010,
        genre: "Ação"
      })
      await mediaService.createNewMedia({
        title: "Nova media 2",
        description: "desc 2",
        type: "series",
        releaseYear: 2015,
        genre: "Drama"
      })
      const medias = await mediaService.getMediasCatalogo()
      expect(medias).toHaveLength(4) // 2 seeds + 2 criadas
    })
  })

  describe('getMediabyID', () => {
    it('retorna mídia correta pelo id', async () => {
      const sandman = await MediaModel.findOne({ title: 'Sandman' })
      const found = await mediaService.getMediabyID(sandman._id)
      expect(found).not.toBeNull()
      expect(found.title).toBe('Sandman')
    })

    it('retorna null para id inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId()
      const found = await mediaService.getMediabyID(fakeId)
      expect(found).toBeNull()
    })
  })
})