import IFilterData, { Movements, Mediums, Materials, IRangeFilter } from '../model/IFilterData';
import ISortOptions, { Sorting } from '../model/ISortOptions';
import StoreDataModel from '../model/storeDataModel';
import { RangeSettingControl, SelectSettingControl, SettingControl } from '../view/settings';
import View from '../view/view';

interface IController {
  filter(options: IFilterData): void;
}

const defaults: IFilterData = {
  movement: [],
  medium: [],
  material: [],
  year: { from: 1996, to: 2022 },
  size: { from: 30, to: 150 },
  price: { from: 50, to: 100 },
};

class Controller implements IController {
  public model: StoreDataModel;
  public view: View;

  constructor(model: StoreDataModel, view: View) {
    this.model = model;
    this.view = view;

    this.model.onUpdate = () =>
      this.model.build().then(() => this.view.update(this.model.data, this.model.state.filters));

    window.onload = () => this.reset();

    this.view.settingsNodes.forEach((setting) => {
      setting.node.oninput = (e) => {
        const state = this.model.state.filters;
        const target = <(SettingControl | SelectSettingControl)['node']>e.target;
        if (target.id === 'sort') this.sort((<HTMLSelectElement>target).value as keyof ISortOptions);
        else if (target.id === 'name') state.name = target.value;
        else if (target.id === 'unique') state.unique = (<HTMLInputElement>target).checked;
        else if (target.id in Movements) {
          if (!state.movement) state.movement = [];
          (<HTMLInputElement>target).checked
            ? state.movement.push(Movements[<keyof typeof Movements>target.id])
            : (state.movement = state.movement.filter((el) => el !== Movements[<keyof typeof Movements>target.id]));
        } else if (target.id in Mediums) {
          if (!state.medium) state.medium = [];
          console.log(state.medium?.map((el) => el !== Mediums[<keyof typeof Mediums>target.id]));
          (<HTMLInputElement>target).checked
            ? state.medium.push(Mediums[<keyof typeof Mediums>target.id])
            : (state.medium = state.medium.filter((el) => el !== Mediums[<keyof typeof Mediums>target.id]));
        } else if (target.id in Materials) {
          if (!state.material) state.material = [];
          (<HTMLInputElement>target).checked
            ? state.material.push(Materials[<keyof typeof Materials>target.id])
            : (state.material = state.material.filter((el) => el !== Materials[<keyof typeof Materials>target.id]));
        } else if (target.id.includes('year')) {
          (<IRangeFilter>state.year)[<keyof IRangeFilter>target.id.replace('year', '')] = Number(target.value);
          (<RangeSettingControl>setting).oninput();
        } else if (target.id.includes('size')) {
          (<IRangeFilter>state.size)[<keyof IRangeFilter>target.id.replace('size', '')] = Number(target.value);
          (<RangeSettingControl>setting).oninput();
        } else if (target.id.includes('price')) {
          (<IRangeFilter>state.price)[<keyof IRangeFilter>target.id.replace('price', '')] = Number(target.value);
          (<RangeSettingControl>setting).oninput();
        }
        this.filter(state);
      };
    });
  }

  sort(option: keyof ISortOptions) {
    this.model.update({ sorting: Sorting[option] });
  }

  filter(options: IFilterData): void {
    this.model.update({ filters: options });
  }

  reset(): void {
    this.filter(defaults);
    this.view.settingsNodes.forEach((setting) => setting.node.dispatchEvent(new Event('input')));
  }
}

export default Controller;
