export interface SuperHeroApiResponse extends PaginationInfo {
  data: Hero[];
}

export interface PaginationInfo {
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
  prevPage?: number;
  nextPage?: number;
}
export interface SuperHeroState {
  list: Hero[];
}

export interface Hero {
  _id: string;
  name: string;
  imageUrl: string;
  firstAppearance: string;
  publisher: string;
}
