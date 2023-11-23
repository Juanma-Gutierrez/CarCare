import { Component } from '@angular/core';
import { AuthService } from './core/services/api/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserPermission } from './core/interfaces/user-permission';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    user: UserPermission | undefined = undefined

    constructor(
        public auth: AuthService,
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

    logoutClicked() {
        console.log("logoutClicked")
        this.auth.logout().subscribe(_ => {
            console.log("logout()")
            this.router.navigate(['/login']);
            this.user = undefined;
        });
    }
}
