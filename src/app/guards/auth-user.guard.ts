import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
    providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

    email: string | null;

    constructor(private router: Router) {
                    this.getUser();
                }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
            return new Promise(
                (resolve, reject) => {
                    firebase.auth().onAuthStateChanged(
                        (user) => {
                            if (user) {
                                resolve(true);
                            } else {
                                this.router.navigate(['signin']);
                                resolve(false);
                            }
                        }
                    );
                }
            );
    }

    getUser() {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            resolve(true);
                            this.email = user.email;
                        }
                    }
                );
            }
        );
    }
    
}
