import AppController from '../controller/controller';
import AppView from '../view/appView';
import { IData } from './IData';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        this.view.drawCategories();

        (<HTMLElement>document.querySelector('.categories')).addEventListener('click', (e: MouseEvent) =>
            this.controller.getSources(e, (data: IData) => this.view.drawSources(data))
        );

        (<HTMLElement>document.querySelector('.sources')).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: IData) => this.view.drawNews(data))
        );
    }
}

export default App;
