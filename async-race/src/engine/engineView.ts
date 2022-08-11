import Control from '../common/control';
import Car from './carView';
import ICar from '../types/ICar';
import './engineView.css';

class EngineView extends Control {
  public id!: number;

  public name: string;

  public color: string;

  public selectButton: HTMLButtonElement;

  public removeButton: HTMLButtonElement;

  public startButton: HTMLButtonElement;

  public stopButton: HTMLButtonElement;

  public track: Control<HTMLElement>;

  public car: Car;

  private animation!: Animation;

  constructor(parentNode: HTMLElement | null, { id, name, color }: ICar) {
    super({ parentNode, className: 'car-row' });
    if (id) this.id = id;
    this.name = name;
    this.color = color;

    const header = new Control({ parentNode: this.node, className: 'car-header', content: `<h1 class = "car-header__car-name">${this.name}</h1>` }).node;
    this.selectButton = new Control<HTMLButtonElement>({
      parentNode: header, tagName: 'button', className: 'control', content: 'SELECT',
    }).node;
    this.removeButton = new Control<HTMLButtonElement>({
      parentNode: header, tagName: 'button', className: 'control', content: 'REMOVE',
    }).node;

    const track = new Control({ parentNode: this.node, className: 'track' }).node;
    this.startButton = new Control<HTMLButtonElement>({
      parentNode: track, tagName: 'button', className: 'track__car-control track__car-control_A', content: 'A',
    }).node;
    this.stopButton = new Control<HTMLButtonElement>({
      parentNode: track, tagName: 'button', className: 'track__car-control track__car-control_B', content: 'B',
    }).node;
    this.stopButton.disabled = true;

    this.track = new Control({ parentNode: track, className: 'track__car-track' });
    this.car = new Car(this.track.node, this.color);

    this.car.renderCar();
  }

  public startCar(time: number) {
    this.startButton.disabled = true;
    this.stopButton.disabled = false;

    this.animation = this.car.node.animate(
      [{ left: '0' }, { left: 'calc(100% - 160px' }],
      { duration: time, easing: 'ease-in-out', fill: 'forwards' },
    );
  }

  public resetCar() {
    this.stopButton.disabled = true;
    this.startButton.disabled = false;

    if (this.animation) this.animation.cancel();
  }

  public killCar() {
    if (this.animation) this.animation.pause();
  }
}

export default EngineView;
