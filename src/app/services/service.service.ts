import { Injectable } from '@angular/core';
import { Service } from '../models/Service.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    serviceSubject$ = new Subject<Service[]>();

    private services: Service[] = [
        {
            id: 1,
            name: 'mobile development',
            description: `We develop complete mobile applications, from initial design to deployment.
            We convert websites into mobile applications.
            We develop API to read some or all of your website content on a mobile application.

            For any other service on mobile applications contact us to find a solution.`
        },
        {
            id: 2,
            name: 'web development',
            description: `We develop complete websites, from initial design to deployment.
            E-commerce websites, blogs, company presentation websites, chat sites, portfolios ...
            We develop APIs to share your website content partially or totally with other websites or mobile applications.
            
            For any other service on websites contact us to find a solution.`
        },
        {
            id: 3,
            name: 'UX & UI design',
            description: `We build designs (logos, icons, sketches, mock-ups and screenshots) of recommended sizes.
            Designs for mobile and web applications.
            Designs for advertising banners.
            Designs for social network banners.
            In addition to the working file, we deliver all the different recommended design formats (4096px, 2048px, 1024px, 512px, 256px, 128px, 64px, 32px, 24px and 16px).
            
            For any other design services please contact us to find a solution.`
        },
        {
            id: 4,
            name: 'cloud hosting',
            description: `For all your mobile and web applications, we help you find the best host and host them.
            We do the continuous deployment of the updated content of your mobile or web applications to your host.
            
            For any other service on hosting contact us to find a solution.`
        }
    ];

    constructor() { }

    emitService() {
        this.serviceSubject$.next(this.services.slice());
    }

    getServiceByName(name: string) {
        const service = this.services.find(
            s => s.name === name
        );

        return service;
    }
}
