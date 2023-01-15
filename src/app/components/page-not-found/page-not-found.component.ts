import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    height: any;

    constructor() { }

    ngOnInit(): void {
        $(document).ready(() => {
            let height = $('body').css('height');

            $('.page-not-found').css('height', height);
        });
    }

}
