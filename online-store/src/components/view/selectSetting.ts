import Control from '../common/control';
import ISettings from '../model/ISettings';
import ISortOptions from '../model/ISortOptions';

class SelectSetting extends Control<HTMLSelectElement> {
  public label: HTMLLabelElement;
  public onUpdate: () => Promise<keyof ISortOptions>;
  public reset: (settings: ISettings) => void;
  constructor({
    parentNode,
    tagName = 'select',
    className = 'setting_select__select',
    content = '',
    id = '',
    labelContent = '',
    options,
    onUpdate,
    reset,
  }: {
    parentNode: HTMLElement | null;
    tagName?: string;
    className?: string;
    content?: string;
    id?: string;
    labelContent?: string;
    options: Record<keyof ISortOptions, string>;
    onUpdate: () => Promise<keyof ISortOptions>;
    reset: (settings: ISettings) => void;
  }) {
    super({ parentNode, tagName, className, content });
    if (id) this.node.id = id;
    if (id) this.node.name = id;

    const label = document.createElement('label');

    label.htmlFor = id;
    label.className = 'setting_select__label';
    label.innerHTML = labelContent;

    if (parentNode) parentNode.append(label);

    this.label = label;

    for (const option in options) {
      const opt = new Control({
        parentNode: this.node,
        tagName: 'option',
        className: 'setting_select__option',
        content: options[<keyof ISortOptions>option],
      });
      (<HTMLOptionElement>opt.node).value = option;
    }

    this.onUpdate = onUpdate;
    this.reset = reset;
  }
}

export default SelectSetting;
