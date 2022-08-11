import EngineAdapter from '../services/engineAdapter';
import EngineStatus from '../types/EngineStatus';
import EngineView from './engineView';
import IEngine from '../types/IEngine';
import calculateTime from '../utils/calculateTime';
import ICar from '../types/ICar';

class EngineController {
  private readonly adapter: EngineAdapter;

  private readonly view: EngineView;

  private readonly id: number;

  public onSelect!: () => void;

  public onRemove!: () => void;

  constructor(id: number, engineAdapter: EngineAdapter, engineView: EngineView) {
    this.id = id;

    this.adapter = engineAdapter;
    this.view = engineView;

    this.view.selectButton.onclick = () => this.onSelect();
    this.view.removeButton.onclick = () => this.onRemove();

    this.view.startButton.onclick = () => this.onStart();
    this.view.stopButton.onclick = () => this.onStop();
  }

  private startEngine(id: number): Promise<IEngine & ICar | void> {
    const details = this.adapter.toggle(id, EngineStatus.STARTED);
    return details
      .then((data) => calculateTime(data))
      .then((time) => this.view.startCar(time))
      .then(() => this.adapter.drive(id))
      .then((isOK) => {
        if (!isOK) {
          this.view.killCar();
          Promise.reject();
        }
        Promise.resolve({ id, details });
      })
      .catch();
  }

  private stopEngine(id: number): void {
    this.adapter.toggle(id, EngineStatus.STOPPED)
      .catch((error) => console.log(error));
    this.view.resetCar();
  }

  public onStart(): Promise<IEngine & ICar | void> {
    this.view.resetCar();
    return this.startEngine(this.id);
  }

  public onStop(): void {
    this.stopEngine(this.id);
  }
}

export default EngineController;
