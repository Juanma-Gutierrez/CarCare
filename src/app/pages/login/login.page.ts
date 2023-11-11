import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/interfaces/UserCredentials';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    /**
    * Llama al servicio de autenticación para realizar el inicio de sesión con
    * las credenciales pasadas y navega a home si el login es exitoso.
    * @param {UserCredentials} credentials - Las credenciales del usuario.
    */
    onLogin(credentials: UserCredentials) {
        console.log(credentials.username, credentials.password);
        this.auth.login(credentials).subscribe({
            next: data => {
                this.router.navigate(['home'])
            },
            error: err => {
                console.log(err);
            }
        });
    }
}
