import express from 'express';
import mongoose from 'mongoose';
import { Author } from './entities/author';
import { Book } from './entities/book';
import { DigitalBook } from './entities/digitalBook';
import { makeCreateAuthorService } from './factory/createAuthorService.factory';
import { makeCreateBookService } from './factory/createBookService.factory';
import { makeGetAllAuthorService } from './factory/getAllAuthorService.factory';
import { makeGetAllBookService } from './factory/getAllBookService.factory';

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

const urlBD = 'mongodb://localhost:27017/node-crud-solid';
mongoose
  .connect(urlBD)
  .then(() => {
    console.log('conectado ao banco');
  })
  .catch((err) => {
    console.log('erro ao conectar no banco');
  });

app.get('/', (req, res) => {
  res.status(200).send({
    name: 'treinamento-renave-solid',
    version: '1.0.0',
  });
});

app.post('/authors', async (req, res) => {
  try {
    const { name } = req.body;

    const createAuthorService = makeCreateAuthorService();

    let author: Author;
    author = new Author(
      name,
    );

    const createdAuthor = await createAuthorService.createAuthor(author);

    return res.status(200).send({
      message: 'author created',
      data: createdAuthor,
    });
  } catch (error: any) {
    return res.status(400).send({
      message: error.message,
      data: null,
    });
  }
});

app.get('/authors', async (req, res) => {
  try {
    const getAllAuthorService = makeGetAllAuthorService();

    const listAuthor = await getAllAuthorService.getAllAuthor();

    return res.status(200).send({
      message: 'authors listed with success',
      data: listAuthor,
    });
  } catch (error: any) {
    return res.status(400).send({
      message: error.message,
      data: null,
    });
  }
});

app.get('/books', async (req, res) => {
  try {
    const getAllBookService = makeGetAllBookService();

    const listBooks = await getAllBookService.getAllBook();

    res.status(200).send({
      message: 'books listed with success',
      data: listBooks,
    });
  } catch (error: any) {
    return res.status(400).send({
      message: error.message,
      data: null,
    });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, qtdPages, authorId, publishDate, isDigital, sizeInKBytes, kindleCompatible } =
      req.body;

    const createBookService = makeCreateBookService();

    let book: Book;
    if (isDigital) {
      book = new DigitalBook(
        title,
        qtdPages,
        authorId,
        new Date(publishDate),
        sizeInKBytes,
        kindleCompatible,
      );
    } else {
      book = new Book(title, qtdPages, authorId, new Date(publishDate));
    }

    const createdBook = await createBookService.createBook(book);

    return res.status(200).send({
      message: 'book created successfuly',
      data: createdBook,
    });
  } catch (error: any) {
    return res.status(400).send({
      message: error.message,
      data: null,
    });
  }
});

app.listen(3000, () => {
  console.log('app listen on port: ' + 3000);
});
