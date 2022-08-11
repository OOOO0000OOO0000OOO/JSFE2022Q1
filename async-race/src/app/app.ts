import Control from '../common/control';
import GarageController from '../garage/garageController';
import GarageView from '../garage/garageView';
import Router from '../router/router';
import GarageAdapter from '../services/garageAdapter';
import './global.css';

class AppController extends Control {
  constructor(parentNode: HTMLElement) {
    super({ parentNode, className: 'application' });

    const garageAdapter = new GarageAdapter();
    const garageView = new GarageView();
    const garageController = new GarageController(garageAdapter, garageView);

    new Router(this.node, [
      ['/garage', garageView.node],
      ['/winners', new Control({ parentNode: null, content: 'winners' }).node],
    ]).init('/garage');
  }
}

export default AppController;
