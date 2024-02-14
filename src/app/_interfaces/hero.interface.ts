export interface SuperHeroState {
  list: Hero[];
  loading: boolean;
}

export interface Hero {
  name: string;
  biography: Biography;
  imageUrl: string;
  _id: string;
}

interface Biography {
  firstAppearance: string;
  publisher: string;
}

export interface filteredData {
  totalItems: number;
  showElements: Hero[];
}

export enum FILTER_BY {
  id = '_id',
  name = 'name',
}
