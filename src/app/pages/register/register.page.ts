import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { DataService } from 'src/app/core/services/api/data.service';

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
        this.authSvc.register(_data).subscribe({
            next: (data) => { },
            error: (err) => { }
        });
    }
}


