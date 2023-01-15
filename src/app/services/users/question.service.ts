import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../../models/Question.model';
/* FIREBASE IMPORTS */
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    questionSubject$ = new Subject<Question[]>();
    
    private questions: Question[] = [];

    constructor() {
        this.getQuestions();
    }

    emitQuestionSubject() {
        this.questionSubject$.next(this.questions.slice());
    }

    saveQuestions() {
        firebase.database().ref('/questions').set(this.questions);
    }

    async getQuestions() {
        await firebase.database().ref('/questions')
            .on('value', (data: DataSnapshot) => {
                this.questions = data.val() ? data.val() : [];
                this.emitQuestionSubject();
            });
    }

    getSingleQuestion(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/questions/' + id).once('value')
                    .then(
                        (data: DataSnapshot) => {
                            resolve(data.val());
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }

    async createQuestion(question: Question) {
        this.questions.push(question);
        await this.saveQuestions();
        this.emitQuestionSubject();
    }

    async removeQuestion(question: Question) {
        const indexToRemove = this.questions.findIndex(
            (data: Question) => data.id === question.id
        );
        this.questions.splice(indexToRemove, 1);
        await this.saveQuestions();
        this.emitQuestionSubject();
    }

    async updateQuestions(question: Question) {
        const index = this.questions.findIndex(
            data => data.id === question.id
        );
        // this.questions[index].content.push(question.content[question.content.length - 1]);
        this.questions[index] = question;
        await this.saveQuestions();
        this.emitQuestionSubject();
    }
}
