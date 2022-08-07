import APIadapter from './APIadapter';
import HTTPStatusCode from '../types/HTTPStatusCode';

interface IWinner {
  id: number,
  wins: number,
  time: number,
}

interface IWinners {
  total: string;
  winners: Promise<IWinner[]>;
}

enum SortOptions {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

class WinnersAdapter extends APIadapter {
  constructor() {
    super();
    this.url += 'winners';
  }

  public getWinners(
    page: number,
    limit = 10,
    sort: SortOptions = SortOptions.ID,
    order: SortOrder = SortOrder.ASC,
  ): Promise<IWinners | void> {
    const route = `?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;

    return fetch(`${this.url}${route}`, { method: 'GET' })
      .then((res): IWinners => ({
        total: res.headers.get('X-Total-Count') || '',
        winners: res.json(),
      }))
      .catch((error): void => console.log(error));
  }

  public createWinner(winner: IWinner): Promise<HTTPStatusCode | void> {
    const route = '';

    return fetch(`${this.url}${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    })
      .then((res): HTTPStatusCode => res.status)
      .catch((error): void => console.log(error));
  }

  public readWinner(id: IWinner['id']): Promise<IWinner | void> {
    const route = `?id=${id}`;

    return fetch(`${this.url}${route}`, { method: 'GET' })
      .then((res) => res.json())
      .then((json): IWinner => json[0])
      .catch((error): void => console.log(error));
  }

  public updateWinner(winner: IWinner): Promise<void> {
    const route = `/${winner.id}`;

    return fetch(`${this.url}${route}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    })
      .then((res): Promise<void> => res.json())
      .catch((error): void => console.log(error));
  }

  public deleteWinner(id: IWinner['id']): Promise<void> {
    const route = `/${id}`;

    return fetch(`${this.url}${route}`, { method: 'DELETE' })
      .then((res): Promise<void> => res.json())
      .catch((error): void => console.log(error));
  }
}

export default WinnersAdapter;
