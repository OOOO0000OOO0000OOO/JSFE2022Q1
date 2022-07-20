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

class Settings extends Control {
  public name: SettingControl;
  public movements: SettingControl[];
  public mediums: SettingControl[];
  public materials: SettingControl[];
  public unique: SettingControl;
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
    return [this.name, ...this.movements, ...this.mediums, ...this.materials, this.unique];
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
export { SettingControl };
