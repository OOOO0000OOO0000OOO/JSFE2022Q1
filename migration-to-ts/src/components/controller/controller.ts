import AppLoader from './appLoader';
import { Endpoints } from './loader';
import { IData } from '../app/IData';

type Callback<T> = (data: T) => void;

class AppController extends AppLoader {
    public getSources(callback: Callback<IData>): void {
        super.getResp(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<IData>): void {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = <string>target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;
