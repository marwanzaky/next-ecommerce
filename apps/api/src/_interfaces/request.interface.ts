export interface IRequest {
    body: any;
    user: {
        id: string;
        iat: number;
        exp: number;
    };
}