export type source = {
    id: string;
    name: string;
};

export interface IArticle {
    source: source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ISource extends source {
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IData {
    articles: IArticle[];
    sources: ISource[];
}
