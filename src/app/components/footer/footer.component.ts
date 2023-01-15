import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from '../../models/Service.model';
import { ServiceService } from '../../services/service.service';
import { Subscription } from 'rxjs';

declare var $: any;
declare var mapboxgl: any;

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

    services: Service[];

    mobile: Service;
    web: Service;
    design: Service;
    hosting: Service;

    serviceSubscription$: Subscription;

    constructor(private serviceService: ServiceService) { }
    
    ngOnInit(): void {
        // SEND MESSAGE WITH MODAL BOX
        $(document).ready(() => {
            if ($('.footer')) {
                // OPEN NEW TAB FOR OTHERS DOMAINS
                $('.social').attr('target', function() {
                    if($('a').host == location.host) return '_self'
                    else return '_blank'
                });
            }

            if ($('#contactModal')) {

                let flashMessage = '';

                $('#sendMessage').click(function(event: any) {
                    let name = $('#nameMessage').val();
                    let email = $('#emailMessage').val();
                    let object = 'Name:' + name + ', Email address:' + email;
                    let message = $('#messageModal').val();
    
                    
    
                    if (message.trim() !== '' && name.trim() !== '' && email.trim() !== '') {
                        $('#sendMessage').attr('href', 'mailto:keenndjc@gmail.com?subject=' + object + '&body=' + message);
    
                        flashMessage = 'Your message is sended successfully!';
                        $('.flash-message').text(flashMessage);

                        setTimeout(() => {
                            name = $('#nameMessage').val('');
                            email = $('#emailMessage').val('');
                            message = $('#messageModal').val('');
                            $('.flash-message').text('');
                        }, 4000);
                    } else {
    
                        if (!name.trim()) {
                            flashMessage = `Your name is empty!
                            `;
                        }
    
                        if (!email.trim()) {
                            flashMessage += `Your email is empty!
                            `;
                        }
    
                        if (!message.trim()) {
                            flashMessage += `Your message is empty!`;
                        }
    
                        $('.flash-message').text(flashMessage);
                        
                        event.preventDefault();
                    }
                });
            }
        });

        // SERVICES
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

        // MAPBXOGL FOR LOCATION
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2VlbjE0ODIiLCJhIjoiY2tyYzF3OGtxNDByczJxczZnbGpzaHJqOSJ9.zSuL8T_mdBDuD-YzKKGHAw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [9.7, 4.05],
            zoom: 18
        });
    }

    ngOnDestroy() {
        this.serviceSubscription$.unsubscribe();
    }

}
