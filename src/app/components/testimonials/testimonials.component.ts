import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { Testimonial } from 'src/app/models/Testimonial.model';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {

    testimonialSubscription$: Subscription;

    testimonials: Testimonial[];

    constructor(private testimonialService: TestimonialService) { }

    ngOnInit(): void {
        this.testimonialSubscription$ = this.testimonialService.testimonialSubject$.subscribe(
            (testimonials: Testimonial[]) => {
                this.testimonials = testimonials;
            }
        );
        this.testimonialService.emitTestimonialSubject();

        $(document).ready(() => {
            if ($('.carousel-inner')) {
                let carousel = document.querySelector('.carousel-inner');
                $(carousel?.firstElementChild).addClass('active');
            }
        });
    }

    ngOnDestroy() {
        this.testimonialSubscription$.unsubscribe();
    }

}
