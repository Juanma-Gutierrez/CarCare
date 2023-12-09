import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    private user: User | null= null;

    constructor(
        private apiSvc: ApiService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.user = this.apiSvc.getUser();
        this.apiSvc.user$.subscribe();
        setTimeout(() => {
            this.router.navigate(['/home']);
        }, 3000);
    }
}

