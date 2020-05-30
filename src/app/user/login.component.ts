import { Component } from "@angular/core";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float:right; color: red; padding-left: 10px;}
    `]
})

export class LoginComponent {
    username
    password
    mouseoverLogin:boolean

    constructor(private authService:AuthService, private route:Router) {

    }
    login(formValues) {
        this.authService.loginUser(formValues.username, formValues.password)
        this.route.navigate(['events'])
    }

    cancel() {
        this.route.navigate(['events']);
    }
}