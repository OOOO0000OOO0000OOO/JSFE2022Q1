import Control from '../common/control';
import ISortOptions from '../model/ISortOptions';

class SelectSetting extends Control<HTMLSelectElement> {
  public label: HTMLLabelElement;
  public onUpdate: () => Promise<keyof ISortOptions>;
  constructor({
    parentNode,
    tagName = 'select',
    className = 'setting',
    content = '',
    id = '',
    labelContent = '',
    options = {
      default: '',
      nameAsc: '',
      yearAsc: '',
      nameDesc: '',
      yearDesc: '',
      priceAsc: '',
      priceDesc: '',
    },
    onUpdate,
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    id?: string;
    labelContent?: string;
    options: Record<keyof ISortOptions, string>;
    onUpdate: () => Promise<keyof ISortOptions>;
  }) {
    super({ parentNode, tagName, className, content });
    if (id) this.node.id = id;
    if (id) this.node.name = id;

    const label = document.createElement('label');

    label.htmlFor = id;
    label.className = `label ${className}`;
    label.innerHTML = labelContent;

    if (parentNode) parentNode.append(label);

    this.label = label;

    for (const option in options) {
      const opt = new Control({
        parentNode: this.node,
        tagName: 'option',
        content: options[<keyof ISortOptions>option],
      });
      (<HTMLOptionElement>opt.node).value = option;
    }

    this.onUpdate = onUpdate;
  }
}

export default SelectSetting;
