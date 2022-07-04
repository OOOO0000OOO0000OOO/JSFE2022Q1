import './news.css';
import { IArticle } from '../../app/IData';

class News {
    public draw(data: IArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item, idx: number) => {
            const newsClone = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);

            if (idx % 2) (<HTMLTemplateElement>newsClone.querySelector('.news__item')).classList.add('alt');

            (<HTMLTemplateElement>newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${
                item.urlToImage || 'https://images.unsplash.com/photo-1635942046031-041e9baea8bd'
            })`;
            (<HTMLTemplateElement>newsClone.querySelector('.news__meta-author')).textContent =
                item.author || item.source.name;
            (<HTMLTemplateElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (<HTMLTemplateElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
            (<HTMLTemplateElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
            (<HTMLTemplateElement>newsClone.querySelector('.news__description-content')).textContent = item.description;
            (<HTMLTemplateElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (<HTMLElement>document.querySelector('.news')).innerHTML = '';
        (<HTMLElement>document.querySelector('.news')).appendChild(fragment);
    }
}

export default News;
