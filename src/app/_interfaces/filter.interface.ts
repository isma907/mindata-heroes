export interface FilterState {
  query: string;
  filterBy: string;
  pageIndex: number;
  pageSize: number;
}

export interface FormFilter {
  filterBy: string;
  query: string;
}
