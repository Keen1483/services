import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Question } from '../../models/Question.model';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../services/users/question.service';
import { AuthUserGuard } from '../../guards/auth-user.guard';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { User } from '../../models/User.model';

declare var $: any;

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {

    faqForm: FormGroup;

    questionSubscription$: Subscription;
    userSubscription$: Subscription;

    questions: Question[] = [];
    users: User[] = [];

    constructor(private fb: FormBuilder,
                private questionService: QuestionService,
                private guard: AuthUserGuard,
                private router: Router,
                private userService: UserService) {}

    ngOnInit(): void {
        $(document).ready(() => {
            $('.question').hide();

            if (parseInt($('body').css('width')) <= 768) {
                $('.ask-question').show();
            }

            $('.ask-question').click(function() {
                $(".question").fadeOut("slow",function(){
                    $(".question").fadeIn("slow");
                });
            });
        });

        this.questionSubscription$ = this.questionService.questionSubject$.subscribe(
            (questions: Question[]) => this.questions = questions
        );
        this.userSubscription$ = this.userService.userSubject$.subscribe(
            (users: User[]) => this.users = users
        );

        this.initForm();
    }

    initForm() {
        this.faqForm = this.fb.group({
            questions: this.fb.array([this.questForm()])
        });
    }

    questForm() {
        return this.fb.group({
            question: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    getQuests() {
        return this.faqForm.controls.questions as FormArray;
    }

    onAddQuests() {
        this.getQuests().push(this.questForm());
    }

    onDeleteQuests(index: number) {
        this.getQuests().removeAt(index);
    }

    onSubmit() {
        const questions = this.faqForm.get('questions')?.value;

        const date = new Date();
        const id = this.questions.length + 1;

        const email = this.guard.email;

        if (email) {
            const user = this.users.find(data => data.email === email);
        
            const firstName = user?.firstName;
            const lastName = user?.lastName

            const quest: Question = {
                id: id,
                content: questions,
                date: date,
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            this.questionService.createQuestion(quest);

            this.router.navigate(['account']);
        }
    }

    ngOnDestroy() {
        this.questionSubscription$.unsubscribe();
        this.userSubscription$.unsubscribe();
    }
}
