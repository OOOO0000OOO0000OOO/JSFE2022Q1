import IFilterData from '../model/IFilterData';
import StoreDataModel from '../model/storeDataModel';
import View from '../view/view';

class Controller {
  public model: StoreDataModel;
  public view: View;

  constructor(model: StoreDataModel, view: View) {
    this.model = model;
    this.view = view;
  }
}

export default Controller;
