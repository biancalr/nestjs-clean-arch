import { Entity } from '@/shared/domain/entities/entity';
import { SearchResult } from '@/shared/domain/repositories/searchable-repository-contracts';

export type PaginationOutput<Item = any> = {
  items: Item[];
  total: number;
  currentpage: number;
  lastPage: number;
  perPage: number;
};

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    result: SearchResult<Entity>,
  ): PaginationOutput<Item> {
    return {
      items,
      total: result.total,
      currentpage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    };
  }
}
