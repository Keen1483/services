import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserService } from '../../services/auths/auth-user.service';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { UserService } from '../../services/users/user.service';
import { User } from '../../models/User.model';
import { Subscription } from 'rxjs';
import { AuthUserGuard } from '../../guards/auth-user.guard';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    userSubscription$: Subscription;

    user: any;

    photoUser: string = '';

    constructor(private authUserService: AuthUserService,
                private userService: UserService,
                private guard: AuthUserGuard) {
        this.getUserStatus()
    }

    ngOnInit(): void {

        this.userSubscription$ = this.userService.userSubject$.subscribe(
            (users: User[]) => {
                for (let user of users) {
                    
                    if (user.email === this.guard.email) {
                        
                        if (user.photo) this.photoUser = user.photo;
                        break;
                    }
                }
            }
        );
    }

    getUserStatus() {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            resolve(true);
                            this.user = user;
                        }
                    }
                );
            }
        );
    }

    signOut() {
        this.authUserService.signOutUser();
    }

    ngOnDestroy() {
        this.userSubscription$.unsubscribe();
    }

}
