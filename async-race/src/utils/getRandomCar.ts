interface IRandomCarData {
  name: string[];
  model: string[];
}

const floor = (number: number): number => Math.floor(number);
const random = (number = 1): number => Math.random() * number;

export function getRandomCarName(): Promise<string> {
  return fetch('./public/cars.json')
    .then((res): Promise<IRandomCarData[]> => res.json())
    .then((data): IRandomCarData => data[0])
    .then((data: IRandomCarData): string => `${data.name[floor(random(data.name.length))]} ${data.model[floor(data.model.length * random())]}`);
}

export function getRandomHex(): string {
  return floor(random(16 ** 6)).toString(16).padEnd(6, '0');
}
