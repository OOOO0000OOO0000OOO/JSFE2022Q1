import Control from '../common/control';
import Controller from '../controller/controller';
import StoreDataModel from '../model/storeDataModel';
import View from '../view/view';

class Application extends Control {
  private readonly controller: Controller;
  private readonly view: View;
  private readonly model: StoreDataModel;

  constructor({ parentNode }: { parentNode: HTMLElement }) {
    super({ parentNode });
    this.model = new StoreDataModel();
    this.view = new View({ parentNode: this.node });
    this.controller = new Controller(this.model, this.view);
  }
}

export default Application;
