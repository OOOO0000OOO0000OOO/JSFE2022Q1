import header from './header.html';
import footer from './footer.html';
import Control from '../common/control';
import GarageController from '../garage/garageController';
import GarageView from '../garage/garageView';
import Router from '../router/router';
import GarageAdapter from '../services/garageAdapter';

import './global.css';
import './header.css';
import './footer.css';

class AppController extends Control {
  private garageController: GarageController;

  private router: Router;

  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'application' });
    parentNode.prepend(new Control({ parentNode: null, className: 'header', content: header }).node);

    const garageAdapter = new GarageAdapter();
    const garageView = new GarageView();
    this.garageController = new GarageController(garageAdapter, garageView);

    this.router = new Router(this.node, [
      ['/garage', garageView.node],
      ['/winners', new Control({ parentNode: null, content: 'winners' }).node],
    ]);
    this.router.init('/garage');

    parentNode.append(new Control({ parentNode, className: 'footer', content: footer }).node);
  }
}

export default AppController;
