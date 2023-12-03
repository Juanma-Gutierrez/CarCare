import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { InternalUIService } from 'src/app/core/services/internalUI.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(
        private auth: AuthService,
        private router: Router,
        private uiSvc: InternalUIService,
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
                this.uiSvc.showToast("Error en los datos introducidos", "danger", "top")
            }
        });
    }
}
