import Control from '../common/control';
import ICar from '../types/ICar';

class CarForm extends Control<HTMLFormElement> {
  public name: HTMLInputElement;

  public color: HTMLInputElement;

  public submit: HTMLButtonElement;

  private id: ICar['id'];

  constructor({ parentNode, content }: { parentNode: HTMLElement, content: string }) {
    super({ parentNode, className: 'garage__form form' });

    const name = new Control<HTMLInputElement>(
      { parentNode: this.node, tagName: 'input', className: 'form__name-input' },
    ).node;
    name.type = 'text';
    name.placeholder = 'Enter a new vehicle name...';
    this.name = name;

    const color = new Control<HTMLInputElement>(
      { parentNode: this.node, tagName: 'input', className: 'form__color-input' },
    ).node;
    color.type = 'color';
    this.color = color;

    const submit = new Control<HTMLButtonElement>(
      {
        parentNode: this.node, tagName: 'button', content, className: 'form__submit-input control',
      },
    ).node;
    this.submit = submit;
  }

  public set values(car: ICar) {
    if (car.id) this.id = car.id;
    this.name.value = car.name;
    this.color.value = car.color;
  }

  public get values(): ICar {
    return { id: this.id, name: this.name.value, color: this.color.value };
  }
}

export default CarForm;
