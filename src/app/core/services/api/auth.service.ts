import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/User';

/**
 * La clase abstracta `AuthService` define la interfaz para un servicio de
 * autenticación. Proporciona métodos abstractos para gestionar la autenticación
 * del usuario, como el inicio de sesión, registro, cierre de sesión y obtener
 * información del usuario.
 */
@Injectable({
    providedIn: 'root'
})
export abstract class AuthService {
    // TODO PONER A FALSE PARA QUE PIDA EL LOGIN
    protected _logged = new BehaviorSubject<boolean>(false);
    public isLogged$ = this._logged.asObservable();
    protected _user = new BehaviorSubject<User | null>(null);
    public user$ = this._user.asObservable();

    public abstract login(credentials: Object): Observable<any>;

    public abstract register(info: Object): Observable<any>;

    public abstract logout(): Observable<void>;

    public abstract me(): Observable<any>;
}
