import { AuthorImplementationRepository } from '../repository/author.implementation.repository';
import { GetAllAuthorService } from '../services/GetAllAuthor.service';



export const makeGetAllAuthorService = (): GetAllAuthorService => {
  return new GetAllAuthorService(new AuthorImplementationRepository());
};
