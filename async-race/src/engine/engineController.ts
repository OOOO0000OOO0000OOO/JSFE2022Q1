import EngineAdapter from '../services/engineAdapter';
import EngineStatus from '../types/EngineStatus';
import EngineView from './engineView';
import calculateTime from '../utils/calculateTime';
import ICar from '../types/ICar';

class EngineController {
  private readonly adapter: EngineAdapter;

  private readonly view: EngineView;

  public readonly id: ICar['id'];

  public onSelect!: () => void;

  public onRemove!: () => void;

  constructor(id: ICar['id'], engineAdapter: EngineAdapter, engineView: EngineView) {
    this.id = id;

    this.adapter = engineAdapter;
    this.view = engineView;

    this.view.selectButton.onclick = () => this.onSelect();
    this.view.removeButton.onclick = () => {
      this.view.destroy();
      this.onRemove();
    };

    this.view.startButton.onclick = () => this.onStart();
    this.view.stopButton.onclick = () => this.onStop();
  }

  private startEngine(id: ICar['id']): Promise<{ id: ICar['id']; time: number } | void> {
    const details = this.adapter.toggle(id, EngineStatus.STARTED);
    const engineTime = details
      .then((data): number => calculateTime(data))
      .then((time): number => this.view.startCar(time));
    return this.adapter.drive(id)
      .then((isOK) => {
        if (!isOK) {
          this.view.killCar();
          throw new Error();
        }
        return engineTime.then((time) => ({ id, time }));
      });
  }

  private stopEngine(id: ICar['id']): void {
    this.adapter.toggle(id, EngineStatus.STOPPED)
      .catch((error) => console.log(error));
    this.view.resetCar();
  }

  public onStart(): Promise<void | { id: ICar['id']; time: number; }> {
    this.view.resetCar();
    return this.startEngine(this.id);
  }

  public onStop(): void {
    this.stopEngine(this.id);
  }

  public setValues(values: ICar): void {
    this.view.values = values;
  }

  public getValues(): ICar {
    return this.view.values;
  }
}

export default EngineController;
