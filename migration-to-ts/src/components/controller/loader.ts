import { IData } from '../app/IData';
import { Callback } from '../types/Callback';

type Options<T> = Record<string, T>;

export enum Endpoints {
    sources = 'sources',
    everything = 'everything',
}

type Method = 'GET' | 'POST';

class Loader<T> {
    readonly baseLink: string;
    readonly options: Options<T>;
    constructor(baseLink: string, options: Options<T>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options }: { endpoint: Endpoints; options?: Options<T> },
        callback: Callback<IData> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options<T>, endpoint: Endpoints): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: Method, endpoint: Endpoints, callback: Callback<IData>, options: Options<T> = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<IData> => res.json())
            .then((data: IData): void => callback(data))
            .catch((err: Response): void => console.error(err));
    }
}

export default Loader;
