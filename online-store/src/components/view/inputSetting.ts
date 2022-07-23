import Control from '../common/control';
import IFilterData from '../model/IFilterData';

class InputSetting extends Control<HTMLInputElement> {
  public label: HTMLLabelElement;
  public onUpdate: (filters: IFilterData) => Promise<IFilterData>;

  constructor({
    parentNode,
    tagName = 'input',
    className = 'setting',
    content = '',
    id = '',
    type = '',
    labelContent = '',
    onUpdate,
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    id?: string;
    type?: string;
    labelContent?: string;
    onUpdate: (filters: IFilterData) => Promise<IFilterData>;
  }) {
    super({ parentNode, tagName, className, content });
    if (id) this.node.id = id;
    if (type) this.node.type = type;

    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = `label ${className}`;
    label.innerHTML = labelContent;
    if (parentNode) parentNode.append(label);
    this.label = label;

    this.onUpdate = onUpdate;
  }
}

export default InputSetting;
