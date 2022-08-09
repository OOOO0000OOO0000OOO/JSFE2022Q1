import APIadapter from './APIadapter';
import HTTPStatusCode from '../types/HTTPStatusCode';
import ICar from '../types/ICar';
import IGarage from '../types/IGarage';

class GarageAdapter extends APIadapter {
  constructor() {
    super();
    this.url += 'garage';
  }

  public getCars(page: number, limit = 7): Promise<IGarage | void> {
    const route = `?_page=${page}&_limit=${limit}`;

    return fetch(`${this.url}${route}`, { method: 'GET' })
      .then((res): IGarage => ({
        total: res.headers.get('X-Total-Count') || '',
        cars: res.json(),
      }))
      .catch((error): void => console.log(error));
  }

  public createCar(car: ICar): Promise<HTTPStatusCode | void> {
    const route = '';

    return fetch(`${this.url}${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then((res): HTTPStatusCode => res.status)
      .catch((error): void => console.log(error));
  }

  public readCar(id: ICar['id']): Promise<ICar | void> {
    const route = `?id=${id}`;

    return fetch(`${this.url}${route}`, { method: 'GET' })
      .then((res) => res.json())
      .then((json): ICar => json[0])
      .catch((error): void => console.log(error));
  }

  public updateCar(car: ICar): Promise<void> {
    const route = `/${car.id}`;

    return fetch(`${this.url}${route}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then((res): Promise<void> => res.json())
      .catch((error): void => console.log(error));
  }

  public deleteCar(id: ICar['id']): Promise<void> {
    const route = `/${id}`;

    return fetch(`${this.url}${route}`, { method: 'DELETE' })
      .then((res): Promise<void> => res.json())
      .catch((error): void => console.log(error));
  }
}

export default GarageAdapter;
