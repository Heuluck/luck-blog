export interface PostResponseData {
    code: number;
    message: string;
    data?: Article[];
}

export interface GETArticleResponseData {
    code: number;
    message: string;
    data?: Article;
}

export interface GETArticleURLResponseData {
    code: number;
    message: string;
    data?: { titleURL: string }[];
}

export interface Article {
    id: number;
    username: string;
    lastUpdate: string;
    title: string;
    content: string;
    titleURL: string;
}