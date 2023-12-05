import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ProvidersService } from 'src/app/core/services/api/providers.service';

@Component({
    selector: 'app-providers',
    templateUrl: './providers.page.html',
    styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
    private user: User | null = null;

    constructor(
        private apiSvc: ApiService,
        public providersSvc: ProvidersService,
    ) { }
    ngOnInit() {
        this.apiSvc.user$.subscribe(user => {
            if (user?.id)
                this.getProviders(user.id);
        })
    }

    async getProviders(userId: number) {
        this.providersSvc.getAll(userId).subscribe();
    }
}




