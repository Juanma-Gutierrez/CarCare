import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';
import { User } from 'src/app/core/interfaces/User';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ProvidersService } from 'src/app/core/services/api/providers.service';

@Component({
    selector: 'app-provider-item',
    templateUrl: './provider-item.component.html',
    styleUrls: ['./provider-item.component.scss'],
})
export class ProviderItemComponent implements OnInit {
    @Input() provider?: Provider
    @Output() onEditProviderClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        public providerSvc: ProvidersService,
        public apiSvc: ApiService,
    ) { }

    ngOnInit() { }

    public async onEditProviderClick(event: Event) {
        this.onEditProviderClicked.emit();
        event.stopPropagation();
    }
}
