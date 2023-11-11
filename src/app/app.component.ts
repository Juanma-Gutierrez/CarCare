import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    constructor(
        private auth: AuthService,
        private router: Router
    ) {
        // Se suscribe al observable isLogged$ del servicio AuthService.
        this.auth.isLogged$.subscribe(logged => {
            if (logged)
                // Si el usuario está autenticado, navega a home.
                this.router.navigate(['/home']);
            else
                // Si el usuario está autenticado, navega a login.
                this.router.navigate(['/login']);
        });
    }
}
