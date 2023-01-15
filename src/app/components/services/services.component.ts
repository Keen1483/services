import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from '../../models/Service.model';
import { ServiceService } from '../../services/service.service';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {

    services: Service[];

    mobile: Service;
    web: Service;
    design: Service;
    hosting: Service;

    serviceSubscription$: Subscription;

    constructor(private serviceService: ServiceService) { }

    ngOnInit(): void {
        $(document).ready(() => {
            let width = parseInt($('body').css('width'));
            if (width <= 768) {
                $('.services__img').addClass('shadow');
            }
        });

        this.serviceSubscription$ = this.serviceService.serviceSubject$.subscribe(
            (services: Service[]) => {
                this.services = services;

                this.mobile = this.services[0];
                this.web = this.services[1];
                this.design = this.services[2];
                this.hosting = this.services[3];
            }
        );
        this.serviceService.emitService();
    }

    ngOnDestroy() {
        this.serviceSubscription$.unsubscribe();
    }

}
