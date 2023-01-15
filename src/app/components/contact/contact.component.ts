import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mail } from '../../models/Mail.model';
import { MailService } from '../../services/users/mail.service';
import { Subscription } from 'rxjs';
import { AuthUserGuard } from '../../guards/auth-user.guard';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { User } from '../../models/User.model';

declare var $: any;

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

    contactForm: FormGroup;
    mailSubscription$: Subscription;
    userSubscription$: Subscription;

    mails: Mail[] = [];
    users: User[] = [];

    constructor(private formBuilder: FormBuilder,
                private mailService: MailService,
                private guard: AuthUserGuard,
                private router: Router,
                private userService: UserService) {}

    ngOnInit(): void {
        this.initForm();

        this.mailSubscription$ = this.mailService.mailSubject$.subscribe(
            (mails: Mail[]) => this.mails = mails
        );
        this.userSubscription$ = this.userService.userSubject$.subscribe(
            (users: User[]) => this.users = users
        );
    }

    initForm() {
        this.contactForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.min(5)]],
            project: ['', [Validators.required, Validators.min(10)]]
        });
    }

    onSubmit() {
        const title = this.contactForm.get('title')?.value;
        const project: string = this.contactForm.get('project')?.value;
        const date = new Date();
        const id = this.mails.length + 1;

        const email = this.guard.email;

        if (email) {
            const user = this.users.find(data => data.email === email);
            const firstName = user?.firstName;
            const lastName = user?.lastName;
            
            const mail: Mail = {
                id: id,
                title: title,
                project: [project],
                date: date,
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            this.mailService.createMail(mail);

            this.router.navigate(['account']);
        }
    }

    ngOnDestroy() {
        this.mailSubscription$.unsubscribe();
        this.userSubscription$.unsubscribe();
    }
}
