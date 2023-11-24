import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/api/auth.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    private _user: User | undefined
    @Input('user') set user(_user: User | undefined) {
        this._user = _user;
    }
    get() {
        return this._user
    }
    public selectedPage = "home";


    constructor(
        private router: Router,
        public auth: AuthService,
    ) { }

    navToAbout() {
        this.selectedPage = "aboutMe"
        console.log(this?.selectedPage)
        this.router.navigate(['/about-me']);
    }

    navToHome() {
        this.selectedPage = "home"
        console.log(this?.selectedPage)
        this.router.navigate(['/home']);
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

