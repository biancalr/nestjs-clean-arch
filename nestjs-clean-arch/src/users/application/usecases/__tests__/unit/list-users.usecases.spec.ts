import { UserInMemoryRepository } from '@/users/infraestructure/database/in-memory/repositories/user-in-memory.repository';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { ListUserUseCase } from '../../list-users.usecase';

describe('ListUsersUseCase unit tests', () => {
  let sut: ListUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new ListUserUseCase.UseCase(repository);
  });
  it('toOutput method', () => {
    let result = new UserRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });
    let output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });

    const entity = new UserEntity(UserDataBuilder({}));
    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });
    output = sut['toOutput'](result);
    expect(output).toStrictEqual({
      items: [entity.toJson()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    });
  });

  it('Shoul return the users ordered by Created At method', async () => {
    const createdAt = new Date();
    const items = [
      new UserEntity(UserDataBuilder({ createdAt })),
      new UserEntity(
        UserDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
    ];
    repository.items = items;

    const output = await sut.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => item.toJson()),
      total: 2,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
    });
  });

  it('Should return the users using pagination sort and filter', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'a' })),
      new UserEntity(UserDataBuilder({ name: 'AA' })),
      new UserEntity(UserDataBuilder({ name: 'Aa' })),
      new UserEntity(UserDataBuilder({ name: 'b' })),
      new UserEntity(UserDataBuilder({ name: 'c' })),
    ];
    repository.items = items;

    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[1].toJson(), items[2].toJson()],
      total: 3,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJson()],
      total: 3,
      currentPage: 2,
      lastPage: 2,
      perPage: 2,
    });

    output = await sut.execute({
      page: 1,
      perPage: 3,
      sort: 'name',
      sortDir: 'desc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJson(), items[2].toJson(), items[1].toJson()],
      total: 3,
      currentPage: 1,
      lastPage: 1,
      perPage: 3,
    });
  });
});
