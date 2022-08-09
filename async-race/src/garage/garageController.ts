import GarageAdapter from '../services/garageAdapter';
import GarageView from './garageView';
import EngineController from '../engine/engineController';
import EngineView from '../engine/engineView';
import EngineAdapter from '../services/engineAdapter';
import IGarage from '../types/IGarage';
import IEngine from '../types/IEngine';
import ICar from '../types/ICar';
import HTTPStatusCode from '../types/HTTPStatusCode';
import { getRandomCarName, getRandomHex } from '../utils/random';
import arrayOf from '../utils/getArrayOf';
import calculateTime from '../utils/calculate';

class GarageController {
  static PAGE_SIZE = 7;

  static GEN_SIZE = 100;

  private adapter: GarageAdapter;

  private view: GarageView;

  private page: number;

  private engines: EngineController[];

  private onUpdate: (total: IGarage['total'] | void) => void;

  private onWinner: ({ name, time }: { name: ICar['name']; time: number }) => void;

  public onWinnerUpdate!: () => void;

  constructor(page: number, garageAdapter: GarageAdapter, garageView: GarageView) {
    this.engines = [];
    this.page = page;

    this.adapter = garageAdapter;
    this.view = garageView;

    this.view.createForm.onsubmit = (): void => this.createCar(
      Object.fromEntries(new FormData(this.view.createForm)) as unknown as ICar,
    );

    this.view.updateForm.onsubmit = (): void => this.updateCar(
      Object.fromEntries(new FormData(this.view.updateForm)) as unknown as ICar,
    );

    this.onUpdate = (total: IGarage['total'] | void) => this.view.update(total, this.page);
    this.onWinner = ({ name, time }: { name: ICar['name']; time: number }): void => this.view.showWinner(name, time);
  }

  private getEngines(): void {
    this.adapter
      .getCars(this.page, GarageController.PAGE_SIZE)
      .then((garage) => {
        this.onUpdate(garage?.total);
        return garage?.cars;
      })
      .then((cars) => cars?.map(
        (car) => new EngineController(
              <number>car.id,
              new EngineAdapter(),
              new EngineView(this.view.node, car),
        ),
      ))
      .then((engines) => {
        if (engines) this.engines = engines;
      })
      .catch((error) => console.log(error));
  }

  private resetEngines(): Promise<IEngine & ICar | void>[] {
    return this.engines.map((engine) => engine.onStart());
  }

  private startRace(): void {
    Promise.any([...this.resetEngines()])
      .then((winner) => this.adapter
        .readCar(winner?.id)
        .then((car) => this.onWinner(
          { name: (<ICar>car).name, time: calculateTime(<IEngine>winner) },
        )))
      .catch((error) => console.log(error));

    this.onWinnerUpdate();
  }

  private generateCars(): void {
    const promises = arrayOf<Promise<HTTPStatusCode | void>>(
      getRandomCarName()
        .then((randName): ICar => ({ name: randName, color: getRandomHex() }))
        .then((car): number => promises.push(this.adapter.createCar(car))),
      GarageController.GEN_SIZE,
    );

    Promise.allSettled(promises)
      .then(() => this.getEngines())
      .catch((error) => console.log(error));
  }

  private createCar(car: ICar): void {
    this.adapter
      .createCar(car)
      .then(() => this.getEngines())
      .catch((error) => console.log(error));
  }

  private updateCar(car: ICar): void {
    this.adapter.updateCar(car)
      .catch((error) => console.log(error));
  }

  private removeCar(id: ICar['id']): void {
    this.adapter.deleteCar(id)
      .catch((error) => console.log(error));
  }
}

export default GarageController;
