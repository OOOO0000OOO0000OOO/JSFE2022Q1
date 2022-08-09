import Control from '../common/control';
import ICar from '../types/ICar';
import IGarage from '../types/IGarage';

class GarageView extends Control<HTMLElement> {
  public showWinner!: (name: ICar['name'], time: number) => void;

  public createForm!: HTMLFormElement;

  public updateForm!: HTMLFormElement;

  update!: (total: IGarage['total'] | void, page: number) => void;
}

export default GarageView;
