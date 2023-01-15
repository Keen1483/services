import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserGuard } from '../../guards/auth-user.guard';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../services/users/question.service';
import { Question } from '../../models/Question.model';
import { Mail } from '../../models/Mail.model';
import { MailService } from '../../services/users/mail.service';
import { AuthUserService } from '../../services/auths/auth-user.service';
import { UserService } from '../../services/users/user.service';
import { User } from '../../models/User.model';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

    questionSubscription$: Subscription;
    mailSubscription$: Subscription;

    questions: Question[] = [];
    mails: Mail[] = [];
    email: string | null;

    userSubscription$: Subscription;
    photoUser: string = '';

    constructor(private guard: AuthUserGuard,
                private questionService: QuestionService,
                private mailService: MailService,
                private authUserService: AuthUserService,
                private userService: UserService) { }

    ngOnInit(): void {
        this.email = this.guard.email;

        // GET QUESTIONS FOR USER WHO IS CONNECTED
        this.questionSubscription$ = this.questionService.questionSubject$.subscribe(
            (questions: Question[]) => {
                
                for (let question of questions) {
                    if (question.email === this.guard.email) {
                        this.questions.push(question);
                    }
                }
            }
        );

        // GET PROJECT DISCUSSIONS FOR USER WHO IS CONNECTED
        this.mailSubscription$ = this.mailService.mailSubject$.subscribe(
            (mails: Mail[]) => {
                for (let mail of mails) {
                    if (mail.email === this.email) {
                        this.mails.push(mail);
                    }
                }
            }
        );

        // GET USER WHO IS CONNECTED
        this.userSubscription$ = this.userService.userSubject$.subscribe(
            (users: User[]) => {
                for (let user of users) {
                    if (user.email === this.email) {
                        if (user.photo) this.photoUser = user.photo;
                    }
                }
            }
        );
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

    signOut() {
        this.authUserService.signOutUser();
    }

    ngOnDestroy() {
        this.questionSubscription$.unsubscribe();
        this.mailSubscription$.unsubscribe();
        this.userSubscription$.unsubscribe();
    }

}
