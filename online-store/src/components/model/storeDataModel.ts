import IFilterData, { Materials, Mediums, Movements } from './IFilterData';
import IProduct from './IProduct';
import ISortOptions, { Sorting } from './ISortOptions';

export const defaults: IFilterData = {
  name: '',
  movement: [],
  medium: [],
  material: [],
  year: { from: 1996, to: 2022 },
  size: { from: 30, to: 150 },
  price: { from: 50, to: 100 },
  unique: false,
};

class StoreDataModel {
  public state: { filters: IFilterData; sorting: ISortOptions[keyof ISortOptions] };
  private _data: IProduct[];
  public onUpdate!: () => void;

  constructor() {
    this._data = [];
    this.state = {
      filters: defaults,
      sorting: Sorting.default,
    };
  }

  public get data(): IProduct[] {
    const _data = this._data;
    return _data.sort(this.state.sorting).filter((product) => this.filter(product));
  }

  public update({ filters, sorting }: { filters?: IFilterData; sorting?: ISortOptions[keyof ISortOptions] }): void {
    if (filters) this.state.filters = filters;
    if (sorting) this.state.sorting = sorting;
    this.onUpdate();
  }

  private filter(product: IProduct): boolean {
    const options: IFilterData = this.state.filters;
    return !(
      (options.name && !product.name.toLowerCase().includes(options.name.toLowerCase())) ||
      (options.year && (options.year.from > product.year || options.year.to < product.year)) ||
      (options.size && (options.size.from > product.size || options.size.to < product.size)) ||
      (options.price && (options.price.from > product.price || options.price.to < product.price)) ||
      (options.movement?.length && !options.movement.some((movement) => Movements[movement] === product.movement)) ||
      (options.medium?.length && !options.medium.some((medium) => Mediums[medium] === product.medium)) ||
      (options.material?.length && !options.material.some((material) => Materials[material] === product.material)) ||
      (options.unique && options.unique !== product.unique)
    );
  }

  public async build(): Promise<this> {
    this._data = await this.loadProductsData('./public/data/artworks.json');
    return this;
  }

  private async loadProductsData(url: string): Promise<IProduct[]> {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}

export default StoreDataModel;
