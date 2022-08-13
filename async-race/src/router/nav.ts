import Control from '../common/control';

class Navigation extends Control {
  public onNext!: () => Promise<{ prev: boolean; next: boolean }>;

  public onPrev!: () => Promise<{ prev: boolean; next: boolean }>;

  prevButton: HTMLButtonElement;

  nextButton: HTMLButtonElement;

  constructor({ parentNode }: { parentNode: HTMLElement }) {
    super({ parentNode });

    const headerNav = new Control({ parentNode: this.node, className: 'nav header' });

    this.prevButton = new Control<HTMLButtonElement>({
      parentNode: headerNav.node, tagName: 'button', className: 'control', content: 'PREV',
    }).node;
    this.prevButton.disabled = true;

    this.nextButton = new Control<HTMLButtonElement>({
      parentNode: headerNav.node, tagName: 'button', className: 'control', content: 'NEXT',
    }).node;
    this.prevButton.disabled = true;

    this.prevButton.onclick = () => this.prev();
    this.nextButton.onclick = () => this.next();
  }

  prev() {
    this.onPrev().then((isDisabled: { prev: boolean; next: boolean }) => this.update(isDisabled));
  }

  next() {
    this.onNext().then((isDisabled: { prev: boolean; next: boolean }) => this.update(isDisabled));
  }

  update(isDisabled: { prev: boolean; next: boolean }) {
    this.prevButton.disabled = isDisabled.prev;
    this.nextButton.disabled = isDisabled.next;
  }
}

export default Navigation;
