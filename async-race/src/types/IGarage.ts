import ICar from './ICar';

interface IGarage {
  total: string;
  cars: Promise<ICar[]>;
}

export default IGarage;
