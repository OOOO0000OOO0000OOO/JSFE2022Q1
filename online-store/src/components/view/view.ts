import Control from '../common/control';
import IProduct from '../model/IProduct';
import IFilterData from '../model/IFilterData';
import ISortOptions from '../model/ISortOptions';
import Settings from './settingsView';
import InputSetting from './inputSetting';
import SelectInputSetting from './selectSetting';
import ISettings from '../model/ISettings';

class View extends Control {
  public main: Control<HTMLElement>;
  public panel: Control;
  public settings: Settings;
  public inputs: InputSetting[];
  public selector: SelectInputSetting;
  public resetButton: HTMLButtonElement;
  public filtersResetButton: HTMLButtonElement;
  public onUpdate!: (options: IFilterData, sorting?: ISortOptions[keyof ISortOptions]) => void;

  constructor({ parentNode, className }: { parentNode: HTMLElement; className: string }) {
    super({ parentNode, className });

    this.panel = new Control({ parentNode: this.node, className: 'settings' });
    this.settings = new Settings(this.panel.node);
    this.selector = this.settings.sorter;
    this.inputs = this.settings.inputs;

    this.filtersResetButton = this.settings.filtersReset.node;
    this.resetButton = this.settings.reset.node;

    this.main = new Control({ parentNode: this.node, className: 'artworks' });
  }

  public reset(settings: ISettings) {
    this.settings.onreset(settings);
  }

  public render(data: IProduct[]): void {
    this.main.node.innerHTML = ``;

    if (!data.length) new Control({ parentNode: this.main.node, className: 'no-matches', content: 'No items found' });

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
