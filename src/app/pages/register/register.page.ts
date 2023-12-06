import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/core/services/api/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(
        private authSvc: AuthService,
    ) { }

    ngOnInit() {
    }

    onRegisterFormSubmit(data: any) {
        let _data: any = { ...data };
        delete _data.confirm;
        console.log(_data)
        Preferences.set({
            key: 'userName',
            value: JSON.stringify(_data.email)
        })
        this.authSvc.register(_data).subscribe({
            next: (data) => { },
            error: (err) => { }
        });
    }
}


