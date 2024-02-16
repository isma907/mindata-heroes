export interface PaginationInfo {
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
  prevPage?: number;
  nextPage?: number;
}

export interface Hero {
  _id: string;
  name: string;
  imageUrl: string;
  firstAppearance: string;
  publisher: string;
}
