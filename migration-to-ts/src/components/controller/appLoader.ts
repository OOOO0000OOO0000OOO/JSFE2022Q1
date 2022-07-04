import Loader from './loader';

class AppLoader extends Loader<string> {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '27b9fa9542854eb2a6eec1a3c5733f66', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
