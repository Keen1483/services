import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from '../../../services/auths/auth-user.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    userForm: FormGroup;

    constructor(private fb: FormBuilder,
        private authUserService: AuthUserService) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
        });
    }

    onSubmit() {
        const email = this.userForm.get('email')?.value;
        const password = this.userForm.get('password')?.value;

        this.authUserService.signInWithEmailAndPassword(email, password);
    }

}
