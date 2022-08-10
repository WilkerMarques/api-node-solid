import express from 'express';
import mongoose from 'mongoose';
import { routesAuthor } from './routes/authorRouter';
import { routesBook } from './routes/bookRouter';
import { routesHome } from './routes/homeRouter';


const authorSchema = new mongoose.Schema({
  nome: { type: 'String', required: true },
  quantidade_livros: { type: 'Number', required: true },
});

const bookSchema = new mongoose.Schema({
  titulo: 'String',
  qtd_paginas: 'Number',
  autor: { type: mongoose.Types.ObjectId, ref: 'Author' },
  data_publicacao: 'Date',
  tamanho: 'Number',
  compativel_kindle: 'Boolean',
});

export const BookModel = mongoose.model('Book', bookSchema);
export const AuthorModel = mongoose.model('Author', authorSchema);

const app = express();
app.use(express.json());
app.use(
  routesAuthor,
  routesBook,
  routesHome
);

const urlBD = 'mongodb://localhost:27017/node-crud-solid';
mongoose
  .connect(urlBD)
  .then(() => {
    console.log('conectado ao banco');
  })
  .catch((err) => {
    console.log('erro ao conectar no banco');
  });

app.listen(3000, () => {
  console.log('app listen on port: ' + 3000);
});
