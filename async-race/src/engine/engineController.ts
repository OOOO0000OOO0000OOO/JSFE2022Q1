import EngineAdapter from '../services/engineAdapter';
import EngineStatus from '../types/EngineStatus';
import EngineView from './engineView';
import calculateTime from '../utils/calculate';

class EngineController {
  private readonly adapter: EngineAdapter;

  private readonly view: EngineView;

  private readonly id: number;

  constructor(id: number, engineAdapter: EngineAdapter, engineView: EngineView) {
    this.id = id;

    this.adapter = engineAdapter;
    this.view = engineView;

    this.view.startButton.onclick = () => this.onStart();
    this.view.stopButton.onclick = () => this.onStop();
  }

  private startEngine(id: number) {
    const details = this.adapter.toggle(id, EngineStatus.STARTED);
    details
      .then((data) => calculateTime(data))
      .then((time) => this.view.startCar(time))
      .then(() => this.adapter.drive(id))
      .then((isOK) => {
        if (!isOK) this.view.killCar();
      })
      .catch((error) => console.log(error));
  }

  private stopEngine(id: number) {
    const details = this.adapter.toggle(id, EngineStatus.STOPPED);
    details
      .then(() => this.view.resetCar())
      .catch((error) => console.log(error));
  }

  public onStart() {
    this.startEngine(this.id);
  }

  public onStop() {
    this.stopEngine(this.id);
  }
}

export default EngineController;
