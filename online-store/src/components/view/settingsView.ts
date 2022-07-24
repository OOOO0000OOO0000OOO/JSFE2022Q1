import Control from '../common/control';
import IFilterData, { Materials, Mediums, Movements } from '../model/IFilterData';
import InputSetting from './inputSetting';
import SelectSetting from './selectSetting';
import RangeSlider from './rangeSlider';
import ISortOptions, { sortValues } from '../model/ISortOptions';
import ISettings from '../model/ISettings';

class Settings extends Control {
  public name: InputSetting;
  public movements: InputSetting[];
  public mediums: InputSetting[];
  public materials: InputSetting[];
  public unique: InputSetting;
  public year: RangeSlider;
  public size: RangeSlider;
  public price: RangeSlider;
  public sorter: SelectSetting;
  public reset: Control<HTMLButtonElement>;
  filtersReset: Control<HTMLButtonElement>;

  constructor(node: HTMLElement) {
    super({ parentNode: node });
    const sorter: SelectSetting = new SelectSetting({
      parentNode: node,
      id: 'sort',
      labelContent: 'Sort:',
      options: sortValues,
      onUpdate: async (): Promise<keyof ISortOptions> => {
        return sorter.node.value as keyof ISortOptions;
      },
      reset: (values: ISettings) => (sorter.node.value = values.sorting),
    });
    this.sorter = sorter;

    const name: InputSetting = new InputSetting({
      parentNode: node,
      className: 'setting search',
      id: 'name',
      type: 'text',
      onUpdate: async (filters: IFilterData) => {
        filters.name = name.node.value;
        return filters;
      },
      reset: () => (name.node.value = ''),
    });
    (<HTMLInputElement>name.node).placeholder = 'Search for artworks...';
    this.name = name;

    new Control({ parentNode: node, tagName: 'h3', content: 'Year' });
    const yearSlider = new RangeSlider({
      parentNode: node,
      className: 'year slider',
      id: 'year',
      min: '1996',
      max: '2022',
    });
    this.year = yearSlider;

    this.movements = [];
    const movementsContainer = new Control({ parentNode: node });
    for (const movement in Movements) {
      const movementsSetting = new InputSetting({
        parentNode: movementsContainer.node,
        className: `setting ${movement}`,
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
    const mediumsContainer = new Control({ parentNode: node });
    for (const medium in Mediums) {
      const mediumsSetting = new InputSetting({
        parentNode: mediumsContainer.node,
        className: `setting ${medium}`,
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
    const materialsContainer = new Control({ parentNode: node });
    for (const material in Materials) {
      const materialsSetting = new InputSetting({
        parentNode: materialsContainer.node,
        className: `setting ${material}`,
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

    new Control({ parentNode: node, tagName: 'h3', content: 'Size' });
    const sizeSlider = new RangeSlider({
      parentNode: node,
      className: 'size slider',
      id: 'size',
      min: '30',
      max: '150',
    });
    this.size = sizeSlider;

    new Control({ parentNode: node, tagName: 'h3', content: 'Price' });
    const priceSlider = new RangeSlider({
      parentNode: node,
      className: 'price slider',
      id: 'price',
      min: '50',
      max: '100',
    });
    this.price = priceSlider;

    const unique = new InputSetting({
      parentNode: node,
      className: 'setting search',
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
      className: 'setting reset',
      content: 'Reset filters',
    });

    this.reset = new Control<HTMLButtonElement>({
      parentNode: node,
      tagName: 'button',
      className: 'setting reset',
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

  public get selects(): SelectSetting[] {
    return [this.sorter];
  }

  public onreset(values: ISettings) {
    [...this.selects, ...this.inputs].forEach((setting) => setting.reset(values));
  }
}

export default Settings;
