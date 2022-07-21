import Control from '../common/control';
import IProduct from '../model/IProduct';
import IFilterData from '../model/IFilterData';
import { Materials, Mediums, Movements } from '../model/IFilterData';

class SettingControl extends Control<HTMLInputElement | HTMLSelectElement> {
  public label: HTMLLabelElement;
  constructor({
    parentNode,
    tagName = 'input',
    className = 'setting',
    content = '',
    id = '',
    type = '',
    labelContent = '',
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    id?: string;
    type?: string;
    labelContent?: string;
  }) {
    super({ parentNode, tagName, className, content });

    this.node.id = id;

    const label = document.createElement('label');

    label.htmlFor = id;
    label.className = `label ${className}`;
    label.innerHTML = labelContent;

    if (parentNode) parentNode.append(label);

    this.label = label;

    if (type) (this.node as HTMLInputElement).type = type;
  }
}

class RangeSettingControl extends SettingControl {
  labelContent: string;
  oninput!: () => void;
  constructor({
    parentNode,
    tagName = 'input',
    className = 'setting',
    content = '',
    id = '',
    type = 'range',
    labelContent = 'from',
    value = (0).toString(),
    min = (0).toString(),
    max = (0).toString(),
    step = (1).toString(),
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    id?: string;
    type?: string;
    labelContent?: 'from' | 'to';
    value: string;
    min?: string;
    max?: string;
    step?: string;
  }) {
    super({ parentNode, tagName, className, content, id, type, labelContent });

    this.labelContent = labelContent;

    (this.node as HTMLInputElement).min = min;
    (this.node as HTMLInputElement).max = max;
    (this.node as HTMLInputElement).step = step;
    (this.node as HTMLInputElement).value = value;
  }
}

class RangeSlider extends Control {
  from: RangeSettingControl;
  to: RangeSettingControl;
  constructor({
    parentNode,
    tagName = 'div',
    className = 'slider',
    content = '',
    id = '',
    min = (0).toString(),
    max = (0).toString(),
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    id?: string;
    min?: string;
    max?: string;
  }) {
    super({ parentNode, tagName, className, content });

    const from = new RangeSettingControl({
      parentNode: this.node,
      className: 'setting from',
      id: `${id}from`,
      type: 'range',
      labelContent: 'from',
      value: min,
      min: min,
      max: max,
      step: (1).toString(),
    });

    const to = new RangeSettingControl({
      parentNode: this.node,
      className: 'setting to',
      id: `${id}to`,
      type: 'range',
      labelContent: 'to',
      value: max,
      min: min,
      max: max,
      step: (1).toString(),
    });

    const sliderView = new Control({ parentNode: this.node }).node;

    const range = new Control({ parentNode: sliderView, className: 'range' });

    const progressLeft = new Control({ parentNode: sliderView, className: 'progress from' });
    const progressRight = new Control({ parentNode: sliderView, className: `progress to` });

    const thumbLeft = new Control({ parentNode: sliderView, className: 'thumb' });
    const thumbRight = new Control({ parentNode: sliderView, className: 'thumb' });

    const signLeft = new Control({ parentNode: sliderView, className: 'sign' });
    const signRight = new Control({ parentNode: sliderView, className: 'sign' });

    from.oninput = () => {
      from.node.value = Math.min(Number(from.node.value), Number(to.node.value)).toString();

      const value = (Number(from.node.value) / parseInt((from.node as HTMLInputElement).max)) * 100;
      progressLeft.node.style.width = `${value}%`;

      range.node.style.left = `${value}%`;

      thumbLeft.node.style.left = `${value}%`;
      signLeft.node.style.left = `${value}%`;
      signLeft.node.innerHTML = `<span>${from.node.value}</span>`;
    };

    to.oninput = () => {
      to.node.value = Math.max(Number(to.node.value), Number(from.node.value)).toString();

      const value = (Number(to.node.value) / parseInt((to.node as HTMLInputElement).max)) * 100;
      progressRight.node.style.width = `${100 - value}%`;

      range.node.style.right = `${100 - value}%`;

      thumbRight.node.style.left = `${value}%`;
      signRight.node.style.left = `${value}%`;
      signRight.node.innerHTML = `<span>${to.node.value}</span>`;
      console.log(value);
    };

    this.to = to;
    this.from = from;
  }
}

class Settings extends Control {
  public name: SettingControl;
  public movements: SettingControl[];
  public mediums: SettingControl[];
  public materials: SettingControl[];
  public unique: SettingControl;
  year: RangeSlider;
  size: RangeSlider;
  price: RangeSlider;

  constructor(node: HTMLElement) {
    super({ parentNode: node });

    const name = new SettingControl({
      parentNode: node,
      className: 'setting search',
      id: 'name',
      type: 'text',
    });
    (<HTMLInputElement>name.node).placeholder = 'Search for artworks...';
    this.name = name;

    const yearSlider = new RangeSlider({
      parentNode: node,
      className: 'year slider',
      id: 'year',
      min: (1996).toString(),
      max: (2022).toString(),
    });

    this.year = yearSlider;

    const sizeSlider = new RangeSlider({
      parentNode: node,
      className: 'size slider',
      id: 'size',
      min: (30).toString(),
      max: (150).toString(),
    });

    this.size = sizeSlider;

    const priceSlider = new RangeSlider({
      parentNode: node,
      className: 'price slider',
      id: 'price',
      min: (50).toString(),
      max: (100).toString(),
    });

    this.price = priceSlider;

    this.movements = [];
    const movementsContainer = new Control({ parentNode: node });
    for (let i = 0; i < 6; i++) {
      const movementSetting = new SettingControl({
        parentNode: movementsContainer.node,
        className: `setting ${Movements[i]}`,
        id: Movements[i],
        type: 'checkbox',
        labelContent: Movements[i],
      });
      this.movements.push(movementSetting);
    }

    this.mediums = [];
    const mediumsContainer = new Control({ parentNode: node });
    for (let i = 0; i < 7; i++) {
      const mediumsSetting = new SettingControl({
        parentNode: mediumsContainer.node,
        className: `setting ${Mediums[i]}`,
        id: Mediums[i],
        type: 'checkbox',
        labelContent: Mediums[i],
      });
      this.mediums.push(mediumsSetting);
    }

    this.materials = [];
    const materialsContainer = new Control({ parentNode: node });
    for (let i = 0; i < 6; i++) {
      const materialsSetting = new SettingControl({
        parentNode: materialsContainer.node,
        className: `setting ${Materials[i]}`,
        id: Materials[i],
        type: 'checkbox',
        labelContent: Materials[i],
      });
      this.materials.push(materialsSetting);
    }

    const unique = new SettingControl({
      parentNode: node,
      className: 'setting search',
      id: 'unique',
      type: 'checkbox',
      labelContent: 'uniue',
    });
    this.unique = unique;
  }

  getNodes() {
    return [
      this.name,
      ...this.movements,
      ...this.mediums,
      ...this.materials,
      this.unique,
      this.year.from,
      this.year.to,
      this.size.from,
      this.size.to,
      this.price.from,
      this.price.to,
    ];
  }

  setOptions(data: IProduct[], options: IFilterData) {
    const selection = data.filter((product) => {
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
    });

    return selection;
  }
}

export default Settings;
export { RangeSettingControl, SettingControl };
