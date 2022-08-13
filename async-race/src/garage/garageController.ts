import GarageAdapter from '../services/garageAdapter';
import GarageView from './garageView';
import EngineController from '../engine/engineController';
import EngineView from '../engine/engineView';
import EngineAdapter from '../services/engineAdapter';
import IGarage from '../types/IGarage';
import ICar from '../types/ICar';
import HTTPStatusCode from '../types/HTTPStatusCode';
import { getRandomCarName, getRandomHex } from '../utils/getRandomCar';
import arrayOf from '../utils/getArrayOf';

class GarageController {
  static PAGE_SIZE = 7;

  static GEN_SIZE = 100;

  private adapter: GarageAdapter;

  private view: GarageView;

  private page: number;

  private engines: EngineController[];

  constructor(garageAdapter: GarageAdapter, garageView: GarageView, page = 1) {
    this.engines = [];
    this.page = page;

    this.adapter = garageAdapter;
    this.view = garageView;

    this.view.creatingForm.submit.onclick = (): void => this.createCar(
      this.view.creatingForm.values,
    );

    this.view.updatingForm.submit.onclick = (): void => this.updateCar(
      this.view.updatingForm.values,
    );

    this.view.raceButton.onclick = () => this.startRace();
    this.view.resetButton.onclick = () => this.resetEngines();
    this.view.generateButton.onclick = () => this.generateCars();

    this.getEngines();
  }

  private onUpdate(total: IGarage['total'] | void): void {
    this.view.updateStats(total, this.page);
  }

  private clearView(): void {
    this.view.clear();
  }

  private getData(): Promise<ICar[]> {
    return this.adapter
      .getCars(this.page, GarageController.PAGE_SIZE)
      .then((garage) => {
        this.onUpdate(garage?.total);
        return garage?.cars || [];
      });
  }

  private createEngine(car: ICar): EngineController {
    const newEngine = new EngineController(
      car.id,
      new EngineAdapter(),
      new EngineView(this.view.garage, car),
    );
    newEngine.onRemove = () => this.removeCar(car.id);
    newEngine.onSelect = () => {
      this.view.updatingForm.values = newEngine.getValues();
      this.view.updatingForm.disable(false);
      this.view.updatingForm.onSubmit = (values: ICar) => newEngine.setValues(values);
    };
    return newEngine;
  }

  private getEngines(): void {
    this.getData()
      .then((cars: ICar[]) => cars.map((car) => this.createEngine(car)))
      .then((engines) => {
        if (engines) this.engines = engines;
      })
      .catch((error: Error) => console.log(error));
  }

  private resetEngines(): void[] {
    this.view.modal?.destroy();
    return this.engines.map((engine) => engine.onStop());
  }

  private startEngines(): Promise<{ id: ICar['id']; time: number } | void>[] {
    this.view.modal?.destroy();
    return this.engines.map((engine) => engine.onStart());
  }

  private startRace(): void {
    Promise.any(this.startEngines())
      .then((winner) => {
        if (winner && winner.id) {
          const winnerTime = winner.time;
          this.adapter.readCar(winner.id)
            .then((winnerCar: ICar | void) => {
              if (winnerCar) this.view.showWinner(winnerCar.name, winnerTime);
            });
        }
      })
      .catch((error: Error) => console.log(error));
  }

  private generateCars(): void {
    const promises = arrayOf<Promise<HTTPStatusCode | void>>(
      () => getRandomCarName()
        .then((randName): ICar => ({ name: randName, color: getRandomHex() }))
        .then((car) => this.adapter.createCar(car)),
      GarageController.GEN_SIZE - 1,
    );
    Promise.allSettled(promises)
      .then(() => this.clearView())
      .then(() => this.getEngines())
      .catch((error: Error) => console.log(error));
  }

  private createCar(car: ICar): void {
    this.view.creatingForm.clear();

    this.adapter.createCar(car)
      .then(() => this.getData())
      .then((cars) => (this.engines.length < GarageController.PAGE_SIZE ? cars.pop() : undefined))
      .then((last) => last && this.engines.push(this.createEngine(last)))
      .catch((error: Error) => console.log(error));
  }

  private updateCar(car: ICar): void {
    this.view.updatingForm.clear();
    this.view.updatingForm.disable(true);

    this.adapter.updateCar(car)
      .catch((error: Error) => console.log(error));

    this.view.updatingForm.onSubmit(car);
  }

  private removeCar(id: ICar['id']): void {
    this.adapter.deleteCar(id)
      .then(() => {
        this.engines = this.engines.filter((engine) => engine.id !== id);
      })
      .then(() => this.getData())
      .then((cars) => (this.engines.length === cars.length - 1
        ? cars.pop()
        : undefined
      ))
      .then((last) => last && this.engines.push(this.createEngine(last)))
      .catch((error: Error) => console.log(error));
  }
}

export default GarageController;
