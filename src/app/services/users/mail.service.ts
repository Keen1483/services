import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mail } from '../../models/Mail.model';

/* FIREBASE IMPORTS */
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
    providedIn: 'root'
})
export class MailService {

    mails: Mail[] = [];

    mailSubject$ = new Subject<Mail[]>();

    constructor() {
        this.getMails();
    }

    emitMailSubject() {
        this.mailSubject$.next(this.mails.slice());
    }

    saveMails() {
        firebase.database().ref('/mails').set(this.mails);
    }

    async getMails() {
        await firebase.database().ref('/mails')
            .on('value', (data: DataSnapshot) => {
                this.mails = data.val() ? data.val() : [];
                this.emitMailSubject();
            });
    }

    getSingleMail(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/mails/' + id).once('value')
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

    async createMail(mail: Mail) {
        this.mails.push(mail);
        await this.saveMails();
        this.emitMailSubject();
    }

    async removeUser(mail: Mail) {
        const indexToRemove = this.mails.findIndex(
            (data) => data === mail
        );
        this.mails.splice(indexToRemove, 1);
        await this.saveMails();
        this.emitMailSubject();
    }

    async removeMail(mail: Mail) {
        const indexToRemove = this.mails.findIndex(
            (data: Mail) => data.id === mail.id
        );
        this.mails.splice(indexToRemove, 1);
        await this.saveMails();
        this.emitMailSubject();
    }

    async updateMails(mail: Mail) {
        const index = this.mails.findIndex(
            data => data.id === mail.id
        );
        this.mails[index - 1] = mail;
        await this.saveMails();
        this.emitMailSubject();
    }
}
