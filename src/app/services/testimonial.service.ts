import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Testimonial } from '../models/Testimonial.model';

@Injectable({
    providedIn: 'root'
})
export class TestimonialService {

    testimonialSubject$ = new Subject<Testimonial[]>();

    private tsetimonials: Testimonial[] = [
        {
            id: 1,
            thought: 'My store works better today thanks to its website and mobile application built by appavenue. The result is more impressive than I expected.',
            stars: 5,
            name: 'Levis Leifeh',
            profession: 'Trader',
            photo: 'client-1.jpg'
        },
        {
            id: 2,
            thought: 'My posts get a lot of comments on my blog. My visitors like the design very much. I highly recommend you.',
            stars: 5,
            name: 'Allison Zawadi',
            profession: 'blogger',
            photo: 'client-2.jpg'
        },
        {
            id: 3,
            thought: 'Our company really appreciated the designs you delivered for our website. We will entrust you with the realization of our mobile application.',
            stars: 5,
            name: 'Franck Djoumessi',
            profession: 'Electrical engineer',
            photo: 'client-3.jpg'
        },
        {
            id: 4,
            thought: 'Many people find the best tourist sites thanks to my mobile application. My friends are very impressed with the work you have done. I am very proud of you.',
            stars: 5,
            name: 'Merylle Beyinda',
            profession: 'Tourism agent',
            photo: 'client-4.jpg'
        },
        {
            id: 5,
            thought: 'Travelers are happy to find the best prices on my website. They are becoming more and more numerous to request my website, I already plan to expand it.',
            stars: 5,
            name: 'Ethan Becker',
            profession: 'Finance manager',
            photo: 'client-5.jpg'
        },
        {
            id: 6,
            thought: 'I used to have a hard time finding clients, but now my portfolio that you have built allows me to easily find better clients.',
            stars: 5,
            name: 'Daisy Onguetou',
            profession: 'Designer',
            photo: 'client-6.jpg'
        }
    ];

    constructor() { }

    emitTestimonialSubject() {
        this.testimonialSubject$.next(this.tsetimonials.slice());
    }
}
