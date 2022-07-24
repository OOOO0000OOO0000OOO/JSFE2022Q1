import IProduct from './IProduct';

interface ISortOptions {
  default: (a: IProduct, b: IProduct) => number;
  nameAsc: (a: IProduct, b: IProduct) => number;
  yearAsc: (a: IProduct, b: IProduct) => number;
  nameDesc: (a: IProduct, b: IProduct) => number;
  yearDesc: (a: IProduct, b: IProduct) => number;
  priceAsc: (a: IProduct, b: IProduct) => number;
  priceDesc: (a: IProduct, b: IProduct) => number;
}

const Sorting: ISortOptions = {
  default: () => 0,
  nameAsc: (a: IProduct, b: IProduct) => (a.name > b.name ? 1 : -1),
  nameDesc: (a: IProduct, b: IProduct) => (a.name > b.name ? -1 : 1),
  yearAsc: (a: IProduct, b: IProduct) => a.year - b.year,
  yearDesc: (a: IProduct, b: IProduct) => b.year - a.year,
  priceAsc: (a: IProduct, b: IProduct) => a.price - b.price,
  priceDesc: (a: IProduct, b: IProduct) => b.price - a.price,
};

export enum sortValues {
  default = 'Default',
  nameAsc = 'Title (asc.)',
  nameDesc = 'Title (desc.)',
  yearAsc = 'Year (asc.)',
  yearDesc = 'Year (desc.)',
  priceAsc = 'Price (asc.)',
  priceDesc = 'Price (desc.)',
}

export default ISortOptions;
export { Sorting };
