import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';

export type Searchinput<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};
