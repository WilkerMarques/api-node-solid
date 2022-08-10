
import { BookImplementationRepository } from '../repository/book.implementation.repository';
import { GetAllBookService } from '../services/GetAllBook.service';


export const makeGetAllBookService = (): GetAllBookService => {
  return new GetAllBookService(new BookImplementationRepository());
};
