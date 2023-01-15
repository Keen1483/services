import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Portfolio } from 'src/app/models/Portfolio.model';

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {

    portfolioSubject$ = new Subject<Portfolio[]>();

    private portfolios: Portfolio[] = [
        {
            id: 1,
            project: 'skin protect, find the best beauty milk',
            category: 'mobile application',
            image: 'portfolio-1.jpg'
        },
        {
            id: 2,
            project: 'house plan, Find the best plan for your house',
            category: 'web application',
            image: 'portfolio-2.jpg'
        },
        {
            id: 3,
            project: 'responsive website mockup',
            category: 'UX/UI design',
            image: 'portfolio-3.jpg'
        },
        {
            id: 4,
            project: 'funny history, a website history blog',
            category: 'cloud hosting',
            image: 'portfolio-4.jpg'
        },
        {
            id: 5,
            project: 'mobile application mockup',
            category: 'UX/UI desing',
            image: 'portfolio-5.jpg'
        },
        {
            id: 6,
            project: 'fitness sport, make your body more attractive',
            category: 'mobile application',
            image: 'portfolio-7.jpg'
        },
        {
            id: 7,
            project: 'friendly worker, find a worker you know',
            category: 'web application',
            image: 'portfolio-7.jpg'
        },
        {
            id: 8,
            project: 'advice on digital services',
            category: 'cloud hosting',
            image: 'portfolio-8.jpg'
        },
        {
            id: 9,
            project: 'secure travel, travel in the best conditions',
            category: 'mobile application',
            image: 'portfolio-9.jpg'
        }
    ];

    constructor() { }

    emitPortfolioSubject() {
        this.portfolioSubject$.next(this.portfolios.slice());
    }
}
