import Control from '../common/control';
import IGarage from '../types/IGarage';
import CarForm from './carForm';
import './garageView.css';

class GarageView extends Control<HTMLElement> {
  public creatingForm: CarForm;

  public updatingForm: CarForm;

  public raceButton: HTMLButtonElement;

  public resetButton: HTMLButtonElement;

  public generateButton: HTMLButtonElement;

  #garage: HTMLElement;

  #stats: HTMLElement;

  constructor() {
    super({ parentNode: null, className: 'garage' });

    this.creatingForm = new CarForm({ parentNode: this.node, content: 'CREATE' });
    this.updatingForm = new CarForm({ parentNode: this.node, content: 'UPDATE' });
    this.updatingForm.disable(true);

    const controls = new Control({ parentNode: this.node, className: 'garage__controls' }).node;
    this.raceButton = new Control<HTMLButtonElement>({
      parentNode: controls, tagName: 'button', className: 'control', content: 'RACE!',
    }).node;
    this.resetButton = new Control<HTMLButtonElement>({
      parentNode: controls, tagName: 'button', className: 'control', content: 'RESET',
    }).node;
    this.generateButton = new Control<HTMLButtonElement>({
      parentNode: controls, tagName: 'button', className: 'control control_generate', content: 'GENERATE CARS',
    }).node;

    this.#stats = new Control({ parentNode: this.node, className: 'garage__stats' }).node;
    this.#garage = new Control({ parentNode: this.node, className: 'garage__content' }).node;
  }

  public clear(): void {
    this.#garage.innerHTML = '';
  }

  public get garage(): HTMLElement {
    return this.#garage;
  }

  public set stats({ total, page }: { total: IGarage['total'] | void, page: number }) {
    this.#stats.innerHTML = `<p>Garage (${total})</p><p class="garage__page-index">Page #${page}</p>`;
  }

  public updateStats(total: IGarage['total'] | void, page: number): void {
    this.stats = { total, page };
  }
}

export default GarageView;
