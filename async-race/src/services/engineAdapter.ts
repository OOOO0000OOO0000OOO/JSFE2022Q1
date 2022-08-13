import APIadapter from './APIadapter';
import HTTPStatusCode from '../types/HTTPStatusCode';
import IEngine from '../types/IEngine';
import EngineStatus from '../types/EngineStatus';
import ICar from '../types/ICar';

class EngineAdapter extends APIadapter {
  constructor() {
    super();
    this.url += 'engine';
  }

  public toggle(id: ICar['id'], status: EngineStatus): Promise<IEngine> {
    const route = `?id=${id}&status=${status}`;

    return fetch(`${this.url}${route}`, { method: 'PATCH' })
      .then((res): Promise<IEngine> => res.json());
  }

  public drive(id: ICar['id']): Promise<boolean | void> {
    const route = `?id=${id}&status=drive`;

    return fetch(`${this.url}${route}`, { method: 'PATCH' })
      .then((res) => {
        if (res.status === HTTPStatusCode.INTERNAL_SERVER_ERROR) {
          throw new Error('The engine is broken down!');
        }
        return (res.status === HTTPStatusCode.OK);
      })
      .catch((error: Error): boolean => {
        console.log(error);
        return false;
      });
  }
}

export default EngineAdapter;
