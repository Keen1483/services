import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../../models/User.model';
import { UserService } from '../../../services/users/user.service';
import { Subscription } from 'rxjs';
import { AuthUserService } from '../../../services/auths/auth-user.service';
import Validation from '../../../utils/Validation.util';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

    userForm: FormGroup;
    submitted = false;
    check = true;
    
    imageUploading = false;
    imageUrl: string;
    imageUploaded = false;

    users: User[] = [];
    userSubscription$: Subscription;


    constructor(private fb: FormBuilder,
                private userService: UserService,
                private authUserService: AuthUserService,
                private router: Router) { }

    ngOnInit(): void {
        this.initForm();

        this.userSubscription$ = this.userService.userSubject$.subscribe(
            (users: User[]) => this.users = users
        );
    }

    initForm() {
        this.userForm = this.fb.group(
            {
                email: [
                    '',
                    [
                        Validators.required,
                        Validators.email
                    ]
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40)
                    ]
                ],
                confirmPassword: ['', Validators.required],
                username: [
                    '',
                    [
                        Validators.minLength(2),
                        Validators.maxLength(20)
                    ]
                ],
                firstName: [
                    '',
                    [
                        Validators.minLength(2),
                        Validators.maxLength(20),
                    ]
                ],
                lastName: [
                    '',
                    [
                        Validators.minLength(2),
                        Validators.maxLength(20)
                    ]
                ]
            },
            // {
            //     Validators: [Validation.match('password', 'confirmPassword')]
            // }
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.userForm.controls;
    }

    async onSubmit() {
        this.submitted = true;
        const email = this.userForm.get('email')?.value;
        const password = this.userForm.get('password')?.value;
        const confirmPassword = this.userForm.value['confirmPassword']
        const username = this.userForm.get('username')?.value;
        const firstName = this.userForm.get('firstName')?.value;
        const lastName = this.userForm.get('lastName')?.value;
        let photo: string = '';
        if (this.imageUrl && this.imageUrl !== '') {
            photo = this.imageUrl;
        }
        const date = new Date();
        const id = this.users.length + 1;
        
        const newUser: User = {
            id: id,
            email: email,
            password: password,
            username: username,
            firstName: firstName,
            lastName: lastName,
            photo: photo,
            date: date
        };

        if (password !== confirmPassword) {
            this.check = false;
        } else {
            await this.authUserService.createUserWithEmailAndPassword(email, password);
            await this.userService.createUser(newUser);
            this.router.navigate(['account/profile']);
        }
    }

    onDetectImage(event: any) {
        this.onUploadImage(event.target.files[0]);
    }
    
    onUploadImage(image: File) {
        this.imageUploading = true;
        this.userService.uploadPhoto(image).then(
            (url: any) => {
                this.imageUrl = url;
                this.imageUploading = false;
                this.imageUploaded = true;
            }
        );
    }

    ngOnDestroy() {
        this.userSubscription$.unsubscribe();
    }

}
