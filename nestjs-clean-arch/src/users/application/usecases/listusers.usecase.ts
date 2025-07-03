import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { Searchinput } from '@/shared/application/dto/search-input';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ListUserUseCase {
  export type Input = Searchinput;

  export type Output = void;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository.Repository) {}
    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);
      return;
    }
  }
}
