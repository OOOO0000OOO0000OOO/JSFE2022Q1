import APIadapter from './APIadapter';
import HTTPStatusCode from '../types/HTTPStatusCode';
import IEngine from '../types/IEngine';
import EngineStatus from '../types/EngineStatus';

class EngineAdapter extends APIadapter {
  constructor() {
    super();
    this.url += 'engine';
  }

  public toggle(id: number, status: EngineStatus): Promise<IEngine | void> {
    const route = `?id=${id}&status=${status}`;

    return fetch(`${this.url}${route}`, { method: 'PATCH' })
      .then((res): Promise<IEngine | void> => res.json())
      .catch((error: Error): void => console.log(error));
  }

  public drive(id: number): Promise<boolean | void> {
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
