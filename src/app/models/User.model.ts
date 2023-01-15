export interface User {
    id: number;
    date: Date;
    email: string;
    password: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
}