import IFilterData from './IFilterData';
import IProduct from './IProduct';

class StoreDataModel {
  public state: IFilterData;
  private _data: IProduct[];
  public onUpdate!: () => void;

  constructor() {
    this._data = [];
    this.state = {};
  }

  public get data() {
    return this._data;
  }

  update(options: IFilterData) {
    this.state = options;
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
