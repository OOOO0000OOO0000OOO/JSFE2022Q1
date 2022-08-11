import Control from '../common/control';

class Router {
  private readonly root: HTMLElement | null;

  private readonly routes: Map<string, HTMLElement>;

  private readonly notFound: HTMLElement;

  constructor(root: HTMLElement, entries: Iterable<readonly [string, HTMLElement]>) {
    this.root = root;
    this.routes = new Map(entries);
    this.notFound = new Control({ parentNode: null }).node;
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

  init(initial: string): void {
    if (!window.location.hash) window.location.hash = `#${initial}`;
    window.onhashchange = () => this.render();
    this.render();
  }
}

export default Router;
