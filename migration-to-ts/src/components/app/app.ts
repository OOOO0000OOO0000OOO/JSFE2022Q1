import AppController from '../controller/controller';
import AppView from '../view/appView';
import { IData } from './IData';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (<HTMLElement>document.querySelector('.sources')).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: IData) => this.view.drawNews(data))
        );
        this.controller.getSources((data: IData): void => this.view.drawSources(data));
    }
}

export default App;
