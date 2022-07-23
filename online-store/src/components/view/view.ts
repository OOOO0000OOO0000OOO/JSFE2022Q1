import Control from '../common/control';
import IProduct from '../model/IProduct';
import IFilterData from '../model/IFilterData';
import ISortOptions from '../model/ISortOptions';
import Settings from './settingsView';
import InputSetting from './inputSetting';
import SelectInputSetting from './selectSetting';

class View extends Control {
  public main: Control<HTMLElement>;
  public settings: Settings;
  public inputs: InputSetting[];
  public selects: SelectInputSetting[];
  public onUpdate!: (options: IFilterData, sorting?: ISortOptions[keyof ISortOptions]) => void;

  constructor({ parentNode }: { parentNode: HTMLElement }) {
    super({ parentNode });

    this.settings = new Settings(new Control({ parentNode: this.node, className: 'settings' }).node);
    this.selects = this.settings.selects;
    this.inputs = this.settings.inputs;

    this.main = new Control({ parentNode: this.node, className: 'artworks' });
  }

  public update(selection: IProduct[]): void {
    this.render(selection);
  }

  public render(data: IProduct[]): void {
    this.main.node.innerHTML = ``;
    data.forEach((product) => {
      const productCard = new Control({ parentNode: this.main.node, className: 'artwork' });
      productCard.node.innerHTML = `<h2 class="product-author">${product.author}</h2>
        <h3 class="product-title"><span class="product.name">${product.name}</span>, <span class="product-year">${
        product.year
      }</span></h3>
        <p class="product-description">${product.description}</p>
        <p class="product-type"><span class="product-medium">${product.medium}</span>, <span class="product-material">${
        product.material
      }</span>, <span class="product-size">${product.size} x ${product.size} cm</span></p>
        <p class="product-movement">${product.movement}</p>
        <p class="product-price">${product.price}</p>
        <p class="product-unique">${product.unique ? 'unique' : ''}</p>
        <img src="./public/img/${product.image}" alt="${product.name}">`;
      this.main.node.append(productCard.node);
    });
  }
}

export default View;
