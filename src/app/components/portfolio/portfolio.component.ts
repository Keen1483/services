import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Portfolio } from 'src/app/models/Portfolio.model';

declare var $: any;

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

    portfolioSubscription$: Subscription;

    portfolios: Portfolio[];

    constructor(private portfolioService: PortfolioService) { }

    ngOnInit(): void {
        $(document).ready(() => {
            let width = parseInt($('body').css('width'));
            if (width <= 768) {
                $('.portfolio-box').removeClass('shadow').addClass('shadow-lg');
            }
        });

        this.portfolioSubscription$ = this.portfolioService.portfolioSubject$.subscribe(
            (portfolios: Portfolio[]) => this.portfolios = portfolios
        );
        this.portfolioService.emitPortfolioSubject();
    }

}
