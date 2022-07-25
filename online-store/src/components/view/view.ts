import Control from '../common/control';
import IProduct from '../model/IProduct';
import IFilterData from '../model/IFilterData';
import ISortOptions from '../model/ISortOptions';
import Settings from './settingsView';
import InputSetting from './inputSetting';
import SelectInputSetting from './selectSetting';
import ISettings from '../model/ISettings';
import './view.css';

class View extends Control {
  public main: Control<HTMLElement>;
  public settings: Settings;
  public inputs: InputSetting[];
  public selector: SelectInputSetting;
  public resetButton: HTMLButtonElement;
  public filtersResetButton: HTMLButtonElement;
  public onUpdate!: (options: IFilterData, sorting?: ISortOptions[keyof ISortOptions]) => void;

  constructor({ parentNode, className }: { parentNode: HTMLElement; className: string }) {
    super({ parentNode, className });
    const storeHeader = new Control({ parentNode: this.node, className: 'store__header' });

    this.settings = new Settings(new Control({ parentNode: this.node, className: 'settings' }).node);
    this.selector = this.settings.selector;
    if (this.selector.node.parentNode) storeHeader.node.append(this.selector.node.parentNode);
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
      productCard.node.innerHTML = `
      <img class="artwork__img" src="./public/img/${product.image}" alt="${product.name}">
      <h2 class="artwork__author">${product.author}</h2>
        <h3 class="artwork__title"><i class="artwork__name">${product.name}</i>, <span class="artwork__year">${
        product.year
      }</span></h3>
        <p class="artwork__description">${product.description}</p>
        <h3 class="artwork__type"><span class="artwork__medium">${
          product.medium
        }</span>, <span class="artwork__material">${product.material}</span>, <span class="artwork__size">${
        product.size
      } x ${product.size} cm</span></h3>
        <h3 class="artwork__movement">${product.movement}</h3>
        <p class="artwork__price">${product.price}</p>
        ${product.unique ? '<p class="artwork__unique">unique</p>' : ''}`;
      this.main.node.append(productCard.node);
    });
  }
}

export default View;
