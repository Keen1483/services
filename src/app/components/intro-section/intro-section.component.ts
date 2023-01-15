import { Component, OnInit } from '@angular/core';
// import GLightbox from 'glightbox';

declare var GLightbox: any;

@Component({
    selector: 'app-intro-section',
    templateUrl: './intro-section.component.html',
    styleUrls: ['./intro-section.component.scss']
})
export class IntroSectionComponent implements OnInit {

    lightbox: any;

    constructor() { }

    ngOnInit(): void {
        this.lightbox = GLightbox({
            // 'href': 'https://youtu.be/UzKX75aiBjM',
            'href': '',
            'type': 'video',
            'source': 'youtube', //vimeo, youtube or local
            'width': 900,
            'autoPlayVideos': true,
        });
    }

}
