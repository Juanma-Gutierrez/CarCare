import { Component } from '@angular/core';
import { AuthService } from './core/services/api/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from './core/interfaces/user';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    protected _user = new BehaviorSubject<User | undefined>(undefined);
    public user$ = this._user.asObservable();

    constructor(
        public auth: AuthService,
        private router: Router
    ) {
        // Se suscribe al observable isLogged$ del servicio AuthService.
        this.auth.isLogged$.subscribe(logged => {
            if (logged) {
                // Si el usuario está autenticado, navega a home.
                this.auth.me().subscribe(data => {
                    this._user.next(data);
                    this.router.navigate(['/home']);
                });
            }
            else
                // Si el usuario está autenticado, navega a login.
                this.router.navigate(['/login']);
        });
    }


}
