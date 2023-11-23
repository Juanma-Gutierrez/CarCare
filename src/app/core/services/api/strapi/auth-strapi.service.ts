import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { UserCredentials } from '../../../interfaces/user-credentials';
import { JwtService } from '../../jwt.service';



export class AuthStrapiService extends AuthService {

    constructor(
        private jwtSvc: JwtService,
        private apiSvc: ApiService
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
                    console.log(data.jwt)
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

    public override me(): Observable<any> {
        throw new Error('Method not implemented.');
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
 
    public me(): Observable<User> {
        return new Observable<User>(obs => {
            this.apiSvc.get('/users/me').subscribe({
                next: async (user: StrapiUser) => {
                    let extended_user = await lastValueFrom(this.apiSvc.get(`/extended-users?filters[user_id]=${user.id}`));
                    let ret: User = {
                        id: user.id,
                        name: extended_user.name,
                        surname: extended_user.surname,
                        age: 0
                    }
                    obs.next(ret);
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
