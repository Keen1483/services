import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { User } from '../../../models/User.model';
import { Subscription } from 'rxjs';
import { AuthUserGuard } from '../../../guards/auth-user.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {

    userSubscription$: Subscription;

    user: User;
    email: string | null;
    photoUser: string = '';
    username: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor(private userService: UserService,
                private guard: AuthUserGuard) {
    }

    ngOnInit(): void {
        this.email = this.guard.email;
        
        this.userSubscription$ = this.userService.userSubject$.subscribe(
            (users: User[]) => {
                for (let user of users) {
                    if (user.email === this.email) {
                        this.user = user;

                        if (this.user.photo) this.photoUser = this.user.photo;
                        if (this.user.username) this.username = this.user.username;
                        if (this.user.firstName) this.firstName = this.user.firstName;
                        if (this.user.lastName) this.lastName = this.user.lastName;
                        break;
                    }
                }
            }
        );
    }
    ngAfterViewInit() {
        
    }

    ngOnDestroy() {
        this.userSubscription$.unsubscribe();
    }

}
