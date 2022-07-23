import IFilterData from '../model/IFilterData';
import ISortOptions, { Sorting } from '../model/ISortOptions';
import StoreDataModel from '../model/storeDataModel';
import View from '../view/view';

interface IController {
  load?(): void;
  filter(options: IFilterData): void;
  sort(option: keyof ISortOptions): void;
  reset(): void;
}

class Controller implements IController {
  public model: StoreDataModel;
  public view: View;

  constructor(model: StoreDataModel, view: View) {
    this.model = model;
    this.view = view;

    window.onload = () => this.reset();
    this.model.onUpdate = () => this.view.update(this.model.data);

    this.view.inputs.forEach((setting) => {
      setting.node.oninput = () => setting.onUpdate(this.model.state.filters).then((filters) => this.filter(filters));
    });

    this.view.selects.forEach((setting) => {
      setting.node.oninput = () => setting.onUpdate().then((comp) => this.sort(comp));
    });
  }

  public sort(option: keyof ISortOptions): void {
    this.model.update({ sorting: Sorting[option] });
  }

  public filter(options: IFilterData): void {
    this.model.update({ filters: options });
  }

  public reset(): void {
    this.model.build().then(() => this.view.update(this.model.data));
    this.view.inputs.forEach((setting) => setting.node.dispatchEvent(new Event('input')));
  }
}

export default Controller;
