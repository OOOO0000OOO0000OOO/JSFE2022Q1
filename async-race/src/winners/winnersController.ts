import WinnersAdapter from '../services/winnersAdapter';
import WinnersView from './winnersView';
import ICar from '../types/ICar';
import IWinners from '../types/IWinners';
import IWinner from '../types/IWinner';

class WinnersController {
  static PAGE_SIZE = 10;

  private adapter: WinnersAdapter;

  private view: WinnersView;

  private page: number;

  private winners: IWinner[];

  onGarageRemove: (id: ICar['id']) => void;

  constructor(winnersAdapter: WinnersAdapter, winnersView: WinnersView, page = 1) {
    this.winners = [];
    this.page = page;

    this.adapter = winnersAdapter;
    this.view = winnersView;

    this.onGarageRemove = (id: ICar['id']) => this.removeWinner(id);

    this.getWinners();
  }

  private removeWinner(id: ICar['id']) {
    if (id) this.adapter.deleteWinner(id);
  }

  private onUpdate(total: IWinners['total'] | void): void {
    this.view.updateStats(total, this.page);
  }

  private getData(): Promise<IWinner[]> {
    return this.adapter
      .getWinners(this.page, WinnersController.PAGE_SIZE)
      .then((winners) => {
        this.onUpdate(winners?.total);
        return winners?.winners || [];
      });
  }

  private getWinners(): void {
    this.getData()
      .then((winners) => {
        this.winners = winners;
      })
      .catch((error: Error) => console.log(error));
  }
}

export default WinnersController;
