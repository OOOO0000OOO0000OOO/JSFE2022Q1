import Control from '../common/control';
import IFilterData, { Materials, Mediums, Movements } from '../model/IFilterData';
import InputSetting from './inputSetting';
import SelectSetting from './selectSetting';
import RangeSlider from './rangeSlider';
import ISortOptions, { sortValues } from '../model/ISortOptions';
import ISettings from '../model/ISettings';
import './settingsView.css';

class Settings extends Control {
  public name: InputSetting;
  public movements: InputSetting[];
  public mediums: InputSetting[];
  public materials: InputSetting[];
  public unique: InputSetting;
  public year: RangeSlider;
  public size: RangeSlider;
  public price: RangeSlider;
  public selector: SelectSetting;
  public reset: Control<HTMLButtonElement>;
  public filtersReset: Control<HTMLButtonElement>;

  constructor(node: HTMLElement) {
    super({ parentNode: node });
    const selector: SelectSetting = new SelectSetting({
      parentNode: new Control({ parentNode: node, className: 'setting setting_select' }).node,
      id: 'sort',
      labelContent: 'Sort:',
      options: sortValues,
      onUpdate: async (): Promise<keyof ISortOptions> => {
        return selector.node.value as keyof ISortOptions;
      },
      reset: (values: ISettings) => (selector.node.value = values.sorting),
    });
    this.selector = selector;

    const name: InputSetting = new InputSetting({
      parentNode: new Control({ parentNode: node, className: 'setting setting_search' }).node,
      className: 'setting_search__input',
      id: 'name',
      type: 'text',
      onUpdate: async (filters: IFilterData) => {
        filters.name = name.node.value;
        return filters;
      },
      reset: () => (name.node.value = ''),
    });
    name.node.placeholder = 'Search for artworks...';
    name.node.autocomplete = 'off';
    this.name = name;

    const yearContainer = new Control({ parentNode: node, className: 'settings-category' }).node;
    new Control({
      parentNode: yearContainer,
      tagName: 'h3',
      className: 'settings-category__name',
      content: 'Year <span class="settings-category__label">1996 — 2022</span>',
    });
    const yearSlider = new RangeSlider({
      parentNode: yearContainer,
      className: 'setting settings-category__setting slider',
      id: 'year',
      min: '1996',
      max: '2022',
    });
    this.year = yearSlider;

    this.movements = [];
    const movementsContainer = new Control({ parentNode: node, className: 'settings-category' });
    new Control({
      parentNode: movementsContainer.node,
      tagName: 'h3',
      className: 'settings-category__name',
      content: 'Movements',
    });
    for (const movement in Movements) {
      const movementsSetting = new InputSetting({
        parentNode: new Control({
          parentNode: movementsContainer.node,
          className: 'setting settings-category__setting',
        }).node,
        className: 'setting__checkbox',
        id: movement,
        type: 'checkbox',
        labelContent: movement,
        onUpdate: async (filters: IFilterData): Promise<IFilterData> => {
          movementsSetting.node.checked
            ? filters.movement.push(<Movements>movementsSetting.node.id)
            : (filters.movement = filters.movement.filter((el) => el !== <Movements>movementsSetting.node.id));
          return filters;
        },
        reset: (values: ISettings) => {
          movementsSetting.node.checked = values.filters.movement.includes(<Movements>movement);
        },
      });
      this.movements.push(movementsSetting);
    }

    this.mediums = [];
    const mediumsContainer = new Control({ parentNode: node, className: 'settings-category' });
    new Control({
      parentNode: mediumsContainer.node,
      tagName: 'h3',
      className: 'settings-category__name',
      content: 'Mediums',
    });
    for (const medium in Mediums) {
      const mediumsSetting = new InputSetting({
        parentNode: new Control({
          parentNode: mediumsContainer.node,
          className: 'setting settings-category__setting',
        }).node,
        className: 'setting__checkbox',
        id: medium,
        type: 'checkbox',
        labelContent: medium,
        onUpdate: async (filters: IFilterData): Promise<IFilterData> => {
          mediumsSetting.node.checked
            ? filters.medium.push(<Mediums>mediumsSetting.node.id)
            : (filters.medium = filters.medium.filter((el) => el !== <Mediums>mediumsSetting.node.id));
          return filters;
        },
        reset: (values: ISettings) => {
          mediumsSetting.node.checked = values.filters.medium.includes(<Mediums>medium);
        },
      });
      this.mediums.push(mediumsSetting);
    }

    this.materials = [];
    const materialsContainer = new Control({ parentNode: node, className: 'settings-category' });
    new Control({
      parentNode: materialsContainer.node,
      tagName: 'h3',
      className: 'settings-category__name',
      content: 'Materials',
    });
    for (const material in Materials) {
      const materialsSetting = new InputSetting({
        parentNode: new Control({
          parentNode: materialsContainer.node,
          className: 'setting settings-category__setting',
        }).node,
        className: 'setting__checkbox',
        id: material,
        type: 'checkbox',
        labelContent: material,
        onUpdate: async (filters: IFilterData): Promise<IFilterData> => {
          materialsSetting.node.checked
            ? filters.material.push(<Materials>materialsSetting.node.id)
            : (filters.material = filters.material.filter((el) => el !== <Materials>materialsSetting.node.id));
          return filters;
        },
        reset: (values: ISettings) => {
          materialsSetting.node.checked = values.filters.material.includes(<Materials>material);
        },
      });
      this.materials.push(materialsSetting);
    }

    const sizeContainer = new Control({ parentNode: node, className: 'settings-category' }).node;
    new Control({
      parentNode: sizeContainer,
      tagName: 'h3',
      className: 'settings-category__name',
      content: 'Size <span class="settings-category__label">30 cm — 150 cm</span>',
    });
    const sizeSlider = new RangeSlider({
      parentNode: sizeContainer,
      className: 'setting settings-category__setting slider',
      id: 'size',
      min: '30',
      max: '150',
    });
    this.size = sizeSlider;

    const priceContainer = new Control({ parentNode: node, className: 'settings-category' }).node;
    new Control({
      parentNode: priceContainer,
      tagName: 'h3',
      className: 'settings-category__name',
      content: 'Price <span class="settings-category__label">€ 50 — € 100</span>',
    });
    const priceSlider = new RangeSlider({
      parentNode: priceContainer,
      className: 'setting settings-category__setting slider',
      id: 'price',
      min: '50',
      max: '100',
    });
    this.price = priceSlider;

    const unique = new InputSetting({
      parentNode: new Control({ parentNode: node, className: 'setting' }).node,
      className: 'setting__checkbox',
      id: 'unique',
      type: 'checkbox',
      labelContent: 'unique',
      onUpdate: async (filters: IFilterData) => {
        filters.unique = unique.node.checked;
        return filters;
      },
      reset: (values: ISettings) => {
        unique.node.checked = values.filters.unique;
      },
    });
    this.unique = unique;

    this.filtersReset = new Control<HTMLButtonElement>({
      parentNode: node,
      tagName: 'button',
      className: 'settings__button',
      content: 'Reset filters',
    });

    this.reset = new Control<HTMLButtonElement>({
      parentNode: node,
      tagName: 'button',
      className: 'settings__button',
      content: 'Reset settings',
    });
  }

  public get inputs(): InputSetting[] {
    return [
      this.name,
      ...this.movements,
      ...this.mediums,
      ...this.materials,
      this.year.from,
      this.year.to,
      this.size.from,
      this.size.to,
      this.price.from,
      this.price.to,
      this.unique,
    ];
  }

  public onreset(values: ISettings) {
    [this.selector, ...this.inputs].forEach((setting) => setting.reset(values));
  }
}

export default Settings;
