import { Author } from '../entities/author';
import { AuthorRepository } from '../repository/author.repository';

export class CreateAuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
  ) { }

  async createAuthor(author: Author): Promise<Author> {
    author.validate();

    const authorCreated = await this.authorRepository.create(author);

    return authorCreated;
  }
}
