import Control from '../common/control';
import IFilterData from '../model/IFilterData';
import IProduct from '../model/IProduct';
import Settings, { SettingControl } from './settings';

class View extends Control {
  main: Control<HTMLElement>;
  settings: Settings;
  settingsNodes: SettingControl[];
  public onUpdate!: (options: IFilterData) => void;

  constructor({ parentNode }: { parentNode: HTMLElement }) {
    super({ parentNode });
    this.settings = new Settings(new Control({ parentNode: this.node, className: 'settings' }).node);
    this.main = new Control({ parentNode: this.node, className: 'artworks' });

    this.settingsNodes = this.settings.getNodes();
  }

  update(data: IProduct[], options: IFilterData) {
    const selection = this.settings.setOptions(data, options);
    this.render(selection);
  }

  render(data: IProduct[]) {
    this.main.node.innerHTML = ``;
    data.forEach((product) => {
      const productCard = new Control({ parentNode: this.main.node, className: 'artwork' });
      productCard.node.innerHTML = `<h2 class="product-author">${product.author}</h2>
        <h3 class="product-title">${product.name}, <span class="product-year">${product.year}</span></h3>
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
