import Control from '../common/control';

class Car extends Control {
  color: string;

  constructor(parentNode: HTMLElement, color = '#ffffff') {
    super({ parentNode, className: 'track__car' });
    this.color = color;
  }

  public renderCar(color?: string): void {
    if (color) this.color = color;

    fetch('./public/car.svg')
      .then((res): Promise<string> => res.text())
      .then((svg): void => {
        const colored = svg.replace('%color%', `${this.color};`);
        this.node.innerHTML = colored;
      });
  }
}

export default Car;
