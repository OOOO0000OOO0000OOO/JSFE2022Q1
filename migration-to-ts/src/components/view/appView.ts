import News from './news/news';
import Sources from './sources/sources';
import Categories from './categories/categories';
import { IData } from '../app/IData';

export class AppView {
    protected readonly news: News;
    protected readonly sources: Sources;
    protected readonly categories: Categories;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.categories = new Categories();
    }

    public drawNews(data: IData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: IData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    public drawCategories(): void {
        this.categories.draw();
    }
}

export default AppView;
