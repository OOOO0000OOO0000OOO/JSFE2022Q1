import Control from '../common/control';
import StoreDataModel from '../model/storeDataModel';
import View from '../view/view';
import './app.css';

import IFilterData from '../model/IFilterData';
import ISettings, { defaultSettings } from '../model/ISettings';
import ISortOptions from '../model/ISortOptions';
class Application extends Control {
  public model: StoreDataModel;
  public view: View;
  private _settings!: ISettings;
  preloader: Control<HTMLElement>;

  constructor({ parentNode }: { parentNode: HTMLElement }) {
    super({ parentNode });
    this.preloader = new Control({ parentNode: this.node, content: '...', className: 'loader' });

    this.model = new StoreDataModel();
    this.view = new View({ parentNode: this.node, className: 'store' });

    this.loadFromStorage();
    this.model.build().then((model) => {
      this.view.render(model.data);
      this.view.reset(model.state);
      this.preloader.destroy();
      this.view.node.style.display = 'block';
    });

    this.model.onUpdate = () => this.view.render(this.model.data);

    this.view.selector.node.oninput = () => this.view.selector.onUpdate().then((comp) => this.sort(comp));
    this.view.inputs.forEach(
      (input) =>
        (input.node.oninput = () => input.onUpdate(this.model.state.filters).then((filters) => this.filter(filters)))
    );

    this.view.resetButton.onclick = () => this.reset();
    this.view.filtersResetButton.onclick = () => this.resetFilters();
  }

  get settings() {
    return this._settings;
  }

  set settings(data: ISettings) {
    this._settings = { ...data, filters: { ...data.filters, name: '' } };
    this.model.state = this.settings;
    this.saveToStorage();
  }

  private loadFromStorage() {
    const storageData: string | null = localStorage.getItem('settings');
    this.settings = storageData ? JSON.parse(storageData) : JSON.parse(JSON.stringify(defaultSettings));
  }

  private saveToStorage() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  public sort(option: keyof ISortOptions): void {
    this.model.update({ sorting: option });
    this.settings = { ...this.settings, sorting: option };
  }

  public filter(options: IFilterData): void {
    this.model.update({ filters: options });
    this.settings = { ...this.settings, filters: options };
  }

  public reset(): void {
    this.settings = JSON.parse(JSON.stringify(defaultSettings));
    this.view.reset(this.settings);
    this.model.update(this.settings);
  }

  public resetFilters(): void {
    this.settings = { ...this.settings, filters: JSON.parse(JSON.stringify(defaultSettings)).filters };
    this.view.reset(this.settings);
    this.model.update(this.settings);
  }
}

export default Application;
