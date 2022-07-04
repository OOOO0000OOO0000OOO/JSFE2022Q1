import './sources.css';
import { ISource } from '../../app/IData';
class Sources {
    public draw(data: ISource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);

            (<HTMLTemplateElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            (<HTMLTemplateElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (<HTMLElement>document.querySelector('.sources')).innerHTML = '';
        (<HTMLElement>document.querySelector('.sources')).append(fragment);
    }
}

export default Sources;
