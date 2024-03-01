export interface SearchState {
  search: string;
  filterBy: FILTER_BY;
  limit: number;
  page: number;
}

export enum FILTER_BY {
  id = '_id',
  name = 'name',
}

export interface PaginationInfo {
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
  prevPage?: number;
  nextPage?: number;
}
