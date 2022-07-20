import IFilterData, { Movements, Mediums, Materials } from '../model/IFilterData';
import StoreDataModel from '../model/storeDataModel';
import { SettingControl } from '../view/settings';
import View from '../view/view';

interface IController {
  filter(options: IFilterData): void;
}

class Controller implements IController {
  public model: StoreDataModel;
  public view: View;

  constructor(model: StoreDataModel, view: View) {
    this.model = model;
    this.view = view;

    this.model.onUpdate = () => this.model.build().then(() => this.view.update(this.model.data, this.model.state));
    this.view.onUpdate = (options) => this.filter(options);

    this.view.settingsNodes.forEach((setting) => {
      setting.node.oninput = (e) => {
        const state = this.model.state;
        const target = <SettingControl['node']>e.target;

        if (target.id === 'name') state.name = target.value;
        if (target.id === 'unique') state.unique = (<HTMLInputElement>target).checked;

        if (target.id in Movements) {
          if (!state.movement) state.movement = [];
          (<HTMLInputElement>target).checked
            ? state.movement.push(Movements[<keyof typeof Movements>target.id])
            : (state.movement = state.movement.filter((el) => el !== Movements[<keyof typeof Movements>target.id]));
        }

        if (target.id in Mediums) {
          if (!state.medium) state.medium = [];
          console.log(state.medium?.map((el) => el !== Mediums[<keyof typeof Mediums>target.id]));
          (<HTMLInputElement>target).checked
            ? state.medium.push(Mediums[<keyof typeof Mediums>target.id])
            : (state.medium = state.medium.filter((el) => el !== Mediums[<keyof typeof Mediums>target.id]));
        }

        if (target.id in Materials) {
          if (!state.material) state.material = [];
          (<HTMLInputElement>target).checked
            ? state.material.push(Materials[<keyof typeof Materials>target.id])
            : (state.material = state.material.filter((el) => el !== Materials[<keyof typeof Materials>target.id]));
        }

        this.filter(state);
      };
    });
  }

  filter(options: IFilterData): void {
    this.model.update(options);
  }
}

export default Controller;
