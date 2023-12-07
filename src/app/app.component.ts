import { Component } from '@angular/core';
import { AuthService } from './core/services/api/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from './core/interfaces/User';
import { ApiService } from './core/services/api/api.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    protected _user = new BehaviorSubject<User | undefined>(undefined);
    public user$ = this._user.asObservable();

    constructor(
        public authSvc: AuthService,
        private router: Router,
        private apiSvc: ApiService
    ) {
        // Se suscribe al observable isLogged$ del servicio AuthService.
        this.authSvc.isLogged$.subscribe(logged => {
            if (logged) {
                // Si el usuario está autenticado, navega a home.
                this.authSvc.me().subscribe(data => {
                    apiSvc.updateUser(data);
                    this.router.navigate(['/home']);
                });
            }
            else
                // Si el usuario no está autenticado, navega a login.
                this.router.navigate(['/login']);
        });
    }


}
