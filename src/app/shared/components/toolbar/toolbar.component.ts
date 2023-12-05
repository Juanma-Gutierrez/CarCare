import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, of } from 'rxjs';
import { User } from 'src/app/core/interfaces/user';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/api/auth.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    public selectedPage = "home";
    public user: User | null = null;

    constructor(
        private router: Router,
        public auth: AuthService,
        public api: ApiService,
    ) { }
    ngOnInit(): void {
        this.api.user$.subscribe(user => {
            this.user = user
        })
    }

    navToAbout() {
        this.selectedPage = "aboutMe"
        this.router.navigate(['/about-me']);
    }

    navToHome() {
        this.selectedPage = "home"
        this.router.navigate(['/home']);
    }

    navToVehicles() {
        this.selectedPage = "vehicles"
        this.router.navigate(['/vehicles']);
    }
    navToProviders() {
        this.selectedPage = "providers"
        this.router.navigate(['/providers']);
    }

    logoutClicked() {
        console.log("logoutClicked")
        this.auth.logout().subscribe(_ => {
            this.router.navigate(['/login']);
        });
    }
}

