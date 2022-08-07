import APIadapter from './APIadapter';
import HTTPStatusCode from '../types/HTTPStatusCode';

enum EngineStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

interface IEngineResponse {
  velocity: number;
  distance: number;
}

class EngineAdapter extends APIadapter {
  constructor() {
    super();
    this.url += 'engine';
  }

  public toggle(id: number, status: EngineStatus): Promise<IEngineResponse | void> {
    const route = `?id=${id}&status=${status}`;

    return fetch(`${this.url}${route}`, { method: 'PATCH' })
      .then((res): Promise<IEngineResponse | void> => res.json())
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
