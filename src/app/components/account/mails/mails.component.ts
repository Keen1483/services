import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserGuard } from '../../../guards/auth-user.guard';
import { Subscription } from 'rxjs';
import { MailService } from '../../../services/users/mail.service';
import { Mail } from '../../../models/Mail.model';

@Component({
    selector: 'app-mails',
    templateUrl: './mails.component.html',
    styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit, OnDestroy {

    mailSubscription$: Subscription;

    mails: Mail[] = [];
    email: string | null;

    constructor(private guard: AuthUserGuard,
                private mailService: MailService) {}

    ngOnInit(): void {
        this.email = this.guard.email;

        this.mailSubscription$ = this.mailService.mailSubject$.subscribe(
            (mails: Mail[]) => this.mails = mails
        );
    }

    getUrlMail(mail: string): string {

        mail = mail.trim();
        mail = mail.toLowerCase();
        mail = mail.replace(/ /g, '-');
        mail = mail.replace(/[éèàêâùûîôëüïöç'"]/g, '');
        mail = mail.replace(/[&=,;]/g, '');
        mail = mail.replace(/[?+*{}\#!^$()[\].\\]/g, '');

        return this.email + '_' + mail;
    }

    ngOnDestroy() {
        this.mailSubscription$.unsubscribe();
    }
}
