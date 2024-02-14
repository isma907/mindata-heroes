export enum FILTER_BY {
  id = '_id',
  name = 'name',
}

export interface filterData {
  search: string;
  filterBy: FILTER_BY;
  limit: number;
  page: number;
}
