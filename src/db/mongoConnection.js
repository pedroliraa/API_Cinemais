import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cinemais';

export async function conexaoMongo() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro ao conectar MongoDB: ', error);
    process.exit(1);
  }
}
