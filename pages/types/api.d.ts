export interface PostResponseData {
    code: number;
    message: string;
    data?: Article[];
}

export interface Article {
    id: number;
    username: string;
    lastUpdate: string;
    title: string;
    content: string;
}