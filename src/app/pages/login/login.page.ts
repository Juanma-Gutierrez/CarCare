import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
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
        private router: Router,
        private toast: ToastController,
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
                const options: ToastOptions = {
                    message: `Error en los datos introducidos`,
                    duration: 2000,
                    position: 'top',
                    color: 'danger',
                    // cssClass: 'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
                };
                this.toast.create(options).then(toast => toast.present());
                console.log(err);
            }
        });
    }
}
