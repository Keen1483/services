import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUserGuard } from '../../../../guards/auth-user.guard';
import { Subscription } from 'rxjs';
import { MailService } from '../../../../services/users/mail.service';
import { Mail } from '../../../../models/Mail.model';

@Component({
    selector: 'app-mail-details',
    templateUrl: './mail-details.component.html',
    styleUrls: ['./mail-details.component.scss']
})
export class MailDetailsComponent implements OnInit, OnDestroy, AfterViewInit {

    mailSubscription$: Subscription;
    filterSubscription$: Subscription;

    mails: Mail[] = [];
    email: string | null;

    specificMail: Mail | undefined;

    constructor(private renderer: Renderer2,
                private route: ActivatedRoute,
                private guard: AuthUserGuard,
                private mailService: MailService) { }

    ngOnInit(): void {
        this.email = this.guard.email;
        const email_project = this.route.snapshot.params['email_project'];

        this.mailSubscription$ = this.mailService.mailSubject$.subscribe(
            (mails: Mail[]) => {
                for (let mail of mails) {
                    if (mail.email === this.email) {
                        this.mails.push(mail);
                    }
                }

                for (let mail of this.mails) {
                    if (this.getUrl(mail.title) === email_project) {
                        this.specificMail = mail;
                        break;
                    }
                }
                if (this.specificMail) {
                    for (let str of this.specificMail.project) {
                        if (str.slice(0, 14) !== 'From_appavenue') {
                            this.userDisplayMail(str);
                        } else {
                            this.appavenueDisplayMail(str.slice(15,));
                        }
                    }
                }
            }
        );
    }

    ngAfterViewInit() {
        let scrollview: any = document.querySelector('.chat-scrollview');
        scrollview = scrollview?.scrollHeight;
    }

    getUrl(str: string): string {
        
        str = str.trim();
        str = str.toLowerCase();
        str = str.replace(/ /g, '-');
        str = str.replace(/[éèàêâùûîôëüïöç'"]/g, '');
        str = str.replace(/[&=,;]/g, '');
        str = str.replace(/[?+*{}\#!^$()[\].\\]/g, '');

        return this.email + '_' + str;
    }

    // SENDER & OWNER TEMPLATE
    bot_template(message: string): Node {
        const divMessage = this.renderer.createElement('div');
        this.renderer.addClass(divMessage, 'chat-message');
        const textMessage = this.renderer.createText(message);
        this.renderer.appendChild(divMessage, textMessage);

        // SECTION MESSAGE
        const sectionMessage = this.renderer.createElement('section');
        this.renderer.appendChild(sectionMessage, divMessage);

        const imgAvatar = this.renderer.createElement('img');
        this.renderer.setAttribute(imgAvatar, 'src', 'https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif');

        // AVATAR
        const divAvatar = this.renderer.createElement('div');
        this.renderer.addClass(divAvatar, 'chat-avatar');
        this.renderer.appendChild(divAvatar, imgAvatar);

        const divWrap = this.renderer.createElement('div');
        this.renderer.addClass(divWrap, 'chat-cluster');
        this.renderer.appendChild(divWrap, divAvatar);
        this.renderer.appendChild(divWrap, sectionMessage);

        return divWrap;
    }

    // AUTHOR TEMPLATE
    user_template(message: string): Node {
        const divMessage = this.renderer.createElement('div');
        this.renderer.addClass(divMessage, 'chat-message');
        const textMessage = this.renderer.createText(message);
        this.renderer.appendChild(divMessage, textMessage);

        // SECTION MESSAGE
        const sectionMessage = this.renderer.createElement('section');
        this.renderer.appendChild(sectionMessage, divMessage);

        const divWrap = this.renderer.createElement('div');
        this.renderer.setAttribute(divWrap, 'mine', '');
        this.renderer.addClass(divWrap, 'chat-cluster');
        this.renderer.appendChild(divWrap, sectionMessage);

        return divWrap;
    }

    // DISPLAY Mail USER FROM SCREEN
    onSendMessage() {
        const author = document.querySelector('.chat-authoring');
        
        if (author?.innerHTML) {
            this.specificMail?.project.push(author.innerHTML);

            if (this.specificMail) {
                this.mailService.updateMails(this.specificMail);
            }

            author.innerHTML = '';
        }
    }

    // DISPLAY Mail USER FROM SERVER
    userDisplayMail(message: string) {
        const messagelist = document.querySelector('.chat-messagelist');
       
        if (!messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
            const divMessage = this.renderer.createElement('div');
            this.renderer.addClass(divMessage, 'chat-message');
            const textMessage = this.renderer.createText(message);
            this.renderer.appendChild(divMessage, textMessage);

            this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
        } else {
            if (message) {
                this.renderer.appendChild(messagelist, this.bot_template(message));
            }
        }
    }

    // DISPLAY Mail appavenue FROM SERVER
    appavenueDisplayMail(message: string) {
        const messagelist = document.querySelector('.chat-messagelist');

        if (messagelist?.querySelector('.chat-cluster:last-child')?.hasAttribute('mine')) {
            const divMessage = this.renderer.createElement('div');
            this.renderer.addClass(divMessage, 'chat-message');
            const textMessage = this.renderer.createText(message);
            this.renderer.appendChild(divMessage, textMessage);

            this.renderer.appendChild(messagelist?.querySelector('.chat-cluster:last-child > section'), divMessage);
        } else {
            if (message) {
                this.renderer.appendChild(messagelist, this.user_template(message));
            }
            
        }
    }

    ngOnDestroy(): void {
        this.mailSubscription$.unsubscribe();
        this.filterSubscription$.unsubscribe();
    }
}
