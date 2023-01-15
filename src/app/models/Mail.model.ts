export interface Mail {
    id: number;
    date: Date;
    title: string;
    project: string[];
    email?: string;
    firstName?: string;
    lastName?: string
}