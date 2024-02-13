export interface Hero {
  name: string;
  biography: Biography;
  images: Images;
  _id: string;
}

interface Images {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

interface Biography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}

export interface filteredData {
  heroesList: Hero[];
  showElements: Hero[];
}
