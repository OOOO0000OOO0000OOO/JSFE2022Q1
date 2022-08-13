import Control from '../common/control';
import IWinners from '../types/IWinners';

class WinnersView extends Control {
  #stats: HTMLElement;

  #winners: HTMLElement;

  constructor() {
    super({ parentNode: null, className: 'winners' });

    this.#stats = new Control({ parentNode: this.node, className: 'winners__stats' }).node;
    this.#winners = new Control({ parentNode: this.node, className: 'winners__content' }).node;
  }

  public set stats({ total, page }: { total: IWinners['total'] | void, page: number }) {
    this.#stats.innerHTML = `<p>Winners (${total})</p><p class="winners__page-index">Page #${page}</p>`;
  }

  public updateStats(total: IWinners['total'] | void, page: number): void {
    this.stats = { total, page };
  }
}

export default WinnersView;
