import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/api/auth.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    public selectedPage = "home";
    public user: User | null | undefined;

    constructor(
        private router: Router,
        public auth: AuthService,
    ) { }
    ngOnInit(): void {
        this.auth.user$.subscribe(user => {
            console.log(user?.username)
        })
    }

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

    navToVehicles(){
        this.selectedPage = "vehicles"
        console.log(this?.selectedPage)
        this.router.navigate(['/vehicles']);
    }

    logoutClicked() {
        console.log("logoutClicked")
        this.auth.logout().subscribe(_ => {
            console.log("logout()")
            this.router.navigate(['/login']);
        });
    }
}

