import IFilterData from './IFilterData';
import IProduct from './IProduct';
import ISortOptions, { Sorting } from './ISortOptions';

class StoreDataModel {
  public state: { filters: IFilterData; sorting: ISortOptions[keyof ISortOptions] };
  private _data: IProduct[];
  public onUpdate!: () => void;

  constructor() {
    this._data = [];
    this.state = {
      filters: {},
      sorting: Sorting.default,
    };
  }

  public get data() {
    const _data = this._data;
    return _data.sort(this.state.sorting);
  }

  update({ filters, sorting }: { filters?: IFilterData; sorting?: ISortOptions[keyof ISortOptions] }): void {
    if (filters) this.state.filters = filters;
    if (sorting) this.state.sorting = sorting;
    this.onUpdate();
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
