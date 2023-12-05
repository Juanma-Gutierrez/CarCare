import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserCredentials } from '../../../interfaces/user-credentials';
import { JwtService } from '../../jwt.service';
import { User, UserRegisterInfo } from 'src/app/core/interfaces/user';
import { PostStrapiRegister, StrapiMe, StrapiOwner, StrapiRegisterPayload, StrapiUser } from './interfaces/strapi-users';
import { StrapiRegisterResponse } from './interfaces/strapi-data';


@Injectable({
    providedIn: 'root'
})
export class AuthStrapiService extends AuthService {

    constructor(
        private jwtSvc: JwtService,
        private apiSvc: ApiService,
    ) {
        super();
        this.jwtSvc.loadToken().subscribe(token => {
            if (token) {
                console.log("token")
                this.me().subscribe(user => {
                    this._logged.next(true);
                    this._user.next(user);
                })
            } else {
                console.log("No token")
                this._logged.next(false);
                this._user.next(null);
            }
        });
    }

    public login(credentials: UserCredentials): Observable<void> {
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


    register(info: UserRegisterInfo): Observable<User> {
        return new Observable<User>(obs => {
            const _info: StrapiRegisterPayload = {
                username: info.username,
                email: info.email,
                password: info.password
            }
            this.apiSvc.post("/api/auth/local/register", _info).subscribe({
                next: async (data: StrapiRegisterResponse) => {
                    await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
                    console.log(data)
                    const _owner: PostStrapiRegister = {
                        data: {
                            name: info.name,
                            surname: info.surname,
                            users_permissions_user: data.user.id
                        }
                    }
                    try {
                        await lastValueFrom(this.apiSvc.post("/api/owners", _owner));
                        const user = await lastValueFrom(this.me());
                        this._user.next(user);
                        this._logged.next(true);
                        obs.next(user);
                        obs.complete();
                    } catch (error) {
                        obs.error(error);
                    }
                },
                error: err => {
                    console.log(err)
                    obs.error(err);
                }
            });
        });
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
                        users_permissions_user: extended_user.owner.id,
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

}
