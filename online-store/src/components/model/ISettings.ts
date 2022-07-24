import IFilterData from './IFilterData';
import ISortOptions from './ISortOptions';

interface ISettings {
  filters: IFilterData;
  sorting: keyof ISortOptions;
}

const defaults: Readonly<IFilterData> = Object.freeze({
  name: '',
  movement: [],
  medium: [],
  material: [],
  year: { from: 1996, to: 2022 },
  size: { from: 30, to: 150 },
  price: { from: 50, to: 100 },
  unique: false,
});

const defaultSettings: Readonly<ISettings> = Object.freeze({
  filters: defaults,
  sorting: 'default',
});

export { defaults, defaultSettings };
export default ISettings;
