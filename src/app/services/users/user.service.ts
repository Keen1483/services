import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../models/User.model';

/* FIREBASE IMPORTS */
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userSubject$ = new Subject<User[]>();
    private users: User[] = [];

    constructor() {
        this.getUsers();
    }

    emitUserSubject() {
        this.userSubject$.next(this.users.slice());
    }

    saveUsers() {
        firebase.database().ref('/users').set(this.users);
    }

    async getUsers() {
        await firebase.database().ref('/users')
            .on('value', (data: DataSnapshot) => {
                this.users = data.val() ? data.val() : [];
                this.emitUserSubject();
            });
    }

    getSingleUser(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/users/' + id).once('value')
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

    // getUserByEmail(email: string | null) {
    //     return new Promise<User>(
    //         (resolve, reject) => {
    //             this.getUsers();
    //             const index = this.users.findIndex(
    //                 (data: User) => data.email === email
    //             );
    //             console.log(this.users);
    //             firebase.database().ref('/users/' + (index - 1)).once('value')
    //                 .then(
    //                     (data: DataSnapshot) => {
    //                         resolve(data.val());
    //                     },
    //                     (error) => {
    //                         reject(error);
    //                     }
    //                 );
    //         }
    //     );
    // }

    async createUser(user: User) {
        this.users.push(user);
        await this.saveUsers();
        this.emitUserSubject();
    }

    // WIP
    async updateUser(user: User) {
        const index = this.users.findIndex(
            (data: User) => data.email === user.email
        );
        this.users[index] = user;
    }

    async removeUser(user: User) {
        if(user.photo) {
            const storageRef = await firebase.storage().refFromURL(user.photo);
            storageRef.delete().then(
                () => {
                    console.log('Photo removed!');
                },
                (error) => {
                    console.log('Cloud not remove photo!');
                }
            );
        }
        const indexToRemove = this.users.findIndex(
            (data) => data === user
        );
        this.users.splice(indexToRemove, 1);
        await this.saveUsers();
        this.emitUserSubject();
    }

    uploadPhoto(photo: File) {
        return new Promise(
            (resolve, reject) => {
                const almostUniqueImageName = Date.now().toString();
                const upload = firebase.storage().ref()
                                .child('photos/' + almostUniqueImageName + photo.name)
                                .put(photo);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log('Loading...');
                    },
                    (error) => {
                        console.log('Loading error! : ' + error);
                        reject(error);
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
    }
}
