import Control from '../common/control';

class Router {
  private readonly root: HTMLElement | null;

  private readonly routes: Map<string, HTMLElement>;

  private readonly notFound: HTMLElement;

  constructor() {
    this.root = document.getElementById('app');
    this.routes = new Map([
      ['/garage', new Control({ parentNode: null, content: 'garage' }).node],
      ['/winners', new Control({ parentNode: null, content: 'winners' }).node],
    ]);
    this.notFound = new Control({ parentNode: null, content: '404' }).node;
  }

  add(path: string, page: HTMLElement): void {
    this.routes.set(path, page);
  }

  delete(path: string): void {
    this.routes.delete(path);
  }

  get(): HTMLElement {
    const path = window.location.hash.slice(1);
    const route = this.routes.get(path);
    return route || this.notFound;
  }

  render(): void {
    const route = this.get();
    if (this.root) {
      this.root.innerHTML = '';
      this.root.append(route);
    }
  }

  init(): void {
    if (!window.location.hash) window.location.hash = '#/garage';
    window.onhashchange = () => this.render();
    this.render();
  }
}

export default Router;
