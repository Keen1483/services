import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserGuard } from '../../../guards/auth-user.guard';
import { Subscription } from 'rxjs';
import { QuestionService } from '../../../services/users/question.service';
import { Question } from '../../../models/Question.model';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

    questionSubscription$: Subscription;

    questions: Question[] = [];
    email: string | null;

    constructor(private guard: AuthUserGuard,
                private questionService: QuestionService) { }

    ngOnInit(): void {
        this.questionSubscription$ = this.questionService.questionSubject$.subscribe(
            (questions: Question[]) => {
                this.questions = questions;
            }
        );

        this.email = this.guard.email;
    }

    getQuestions(email: string | null, questions: Question[]) {
        let questionsByEmail: Question[] = [];
        for (let question of questions) {
            if (question.email === email) {
                questionsByEmail?.push(question);
            }
        }

        return questionsByEmail;
    }

    getUrlQuestion(question: string): string {

        question = question.trim();
        question = question.toLowerCase();
        question = question.replace(/ /g, '-');
        question = question.replace(/[éèàêâùûîôëüïöç'"]/g, '');
        question = question.replace(/[&=,;]/g, '');
        question = question.replace(/[?+*{}\#!^$()[\].\\]/g, '');

        return this.email + '_' + question;
    }


    ngOnDestroy() {
        this.questionSubscription$.unsubscribe();
    }

}
