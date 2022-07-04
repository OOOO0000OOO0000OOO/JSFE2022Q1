import './categories.css';

enum CategoryOptions {
    business = 'business',
    entertainment = 'entertainment',
    general = 'general',
    health = 'health',
    science = 'science',
    sports = 'sports',
    technology = 'technology',
}

class Categories {
    static options = CategoryOptions;

    public draw(): void {
        const fragment = document.createDocumentFragment();
        const categoryItemTemp = <HTMLTemplateElement>document.querySelector('#categoryItemTemp');

        for (const item in Categories.options) {
            const categoryClone = <HTMLTemplateElement>categoryItemTemp.content.cloneNode(true);

            (<HTMLTemplateElement>categoryClone.querySelector('.category__item-name')).textContent = item;
            (<HTMLTemplateElement>categoryClone.querySelector('.category__item')).setAttribute(
                'data-category-id',
                item
            );

            fragment.append(categoryClone);
        }

        (<HTMLElement>document.querySelector('.categories')).append(fragment);
    }
}

export default Categories;
