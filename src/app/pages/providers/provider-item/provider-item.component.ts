import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { Provider } from 'src/app/core/services/api/strapi/interfaces/strapi-providers';

@Component({
    selector: 'app-provider-item',
    templateUrl: './provider-item.component.html',
    styleUrls: ['./provider-item.component.scss'],
})
export class ProviderItemComponent implements OnInit {
    @Input() provider: Provider | undefined

    constructor(
        public providerSvc: ProvidersService,
        public apiSvc: ApiService,
    ) { }

    ngOnInit() {
    }
}
