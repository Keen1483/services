import { Component, OnInit } from '@angular/core';

/* FIREBASE IMPORTS */
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app-avenue';

    constructor() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDUfrDVXmkIJrY62ouvbW7GGSKsG1SuEi8",
            authDomain: "appavenue-53413.firebaseapp.com",
            projectId: "appavenue-53413",
            storageBucket: "appavenue-53413.appspot.com",
            messagingSenderId: "783912791579",
            appId: "1:783912791579:web:00ee43cb2c18082ef112be"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    ngOnInit() {
        $(document).ready(() => {
            let heightNav = $('.navbar').css('height');
            $('.account').css('margin-top', heightNav);
        });
    }
}
