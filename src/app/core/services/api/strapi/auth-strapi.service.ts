import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserCredentials } from '../../../interfaces/user-credentials';
import { JwtService } from '../../jwt.service';
import { User } from 'src/app/core/interfaces/user';
import { StrapiMe, StrapiUser } from './interfaces/strapi-users';


@Injectable({
    providedIn: 'root'
})
export class AuthStrapiService extends AuthService {

    constructor(
        private jwtSvc: JwtService,
        private apiSvc: ApiService,
    ) {
        super();
        this.init();
    }

    private init() {
        this.jwtSvc.loadToken().subscribe({
            next: _ => {
                this._logged.next(true);
            },
            error: err => {
                console.error(err);
            }
        });
    }

    public login(credentials: UserCredentials): Observable<void> {
        console.log('this.authSvc:', this.apiSvc);
        return new Observable<void>(obs => {
            const _credentials = {
                identifier: credentials.username,
                password: credentials.password
            };
            this.apiSvc.post("/api/auth/local", _credentials).subscribe({
                next: async (data) => {
                    await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
                    let connected = data && data.jwt != '';
                    this._logged.next(connected);
                    this.me().subscribe(
                        (user: User) => {
                            console.log("updateUser", user)
                            if (this.apiSvc) {
                                console.log("update")
                                this.apiSvc.updateUser(user);
                            } else {
                                console.error('this.authSvc no está definido.');
                            }
                        },
                        error => {
                            console.error('Error en la suscripción a me():', error);
                        }
                    );
                    obs.next();
                    obs.complete();
                },
                error: err => {
                    obs.error(err);
                }
            });
        });
    }

    logout(): Observable<void> {
        return this.jwtSvc.destroyToken().pipe(map(_ => {
            this._logged.next(false);
            return;
        }));
    }

    public override register(info: Object): Observable<any> {
        throw new Error('Method not implemented.');
    }


    public me(): Observable<User> {
        return new Observable<User>(obs => {
            this.apiSvc.get('/api/users/me').subscribe({
                next: async (user: StrapiMe) => {
                    console.log(user)
                    let extended_user = await lastValueFrom
                        (this.apiSvc.get(`/api/users/${user.id}?populate=owner`));
                    let ret: User = {
                        id: user.id,
                        ownerId: extended_user.owner.id,
                        username: user.username,
                        email: user.email,
                        name: extended_user.owner.name,
                        surname: extended_user.owner.surname,
                    }
                    console.log(ret);
                    obs.next(ret);
                    obs.complete();
                },
                error: err => {
                    obs.error(err);
                }
            });
        });

    }

    /*
    register(info: UserRegisterInfo): Observable<void> {
        return new Observable<void>(obs => {
            const _info: StrapiRegisterPayload = {
                email: info.email,
                username: info.nickname,
                password: info.password
            }
            this.apiSvc.post("/auth/local/register", info).subscribe({
                next: async (data: StrapiRegisterResponse) => {
                    let connected = data && data.jwt != '';
                    this._logged.next(connected);
                    await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
                    const _extended_user: StrapiExtendedUser = {
                        name: info.name,
                        surname: info.surname,
                        user_id: data.user.id
                    }
                    await lastValueFrom(this.apiSvc.post("/extended_user", _extended_user));
                    obs.next();
                    obs.complete();
                },
                error: err => {
                    obs.error(err);
                }
            });
        });
    }
 
*/

}
