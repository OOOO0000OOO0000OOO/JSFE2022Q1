import header from './header.html';
import footer from './footer.html';
import Control from '../common/control';
import GarageAdapter from '../services/garageAdapter';
import GarageController from '../garage/garageController';
import GarageView from '../garage/garageView';
import Router from '../router/router';
import WinnersAdapter from '../services/winnersAdapter';
import WinnersController from '../winners/winnersController';
import WinnersView from '../winners/winnersView';

import './global.css';
import './header.css';
import './footer.css';

class AppController extends Control {
  private garageController: GarageController;

  private winnersController: WinnersController;

  private router: Router;

  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'application' });
    parentNode.prepend(new Control({ parentNode: null, className: 'header', content: header }).node);

    const garageAdapter = new GarageAdapter();
    const garageView = new GarageView();
    this.garageController = new GarageController(garageAdapter, garageView);

    const winnersAdapter = new WinnersAdapter();
    const winnersView = new WinnersView();
    this.winnersController = new WinnersController(winnersAdapter, winnersView);

    this.router = new Router(this.node, [
      ['/garage', garageView.node],
      ['/winners', winnersView.node],
    ]);
    parentNode.append(new Control({ parentNode, className: 'footer', content: footer }).node);
  }

  init() {
    this.router.init('/garage');
  }
}

export default AppController;
