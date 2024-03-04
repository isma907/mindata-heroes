export interface HeroesStore {
  list: Hero[];
}

export interface Hero {
  _id: string;
  name: string;
  imageUrl: string;
  firstAppearance: string;
  publisher: string;
}
