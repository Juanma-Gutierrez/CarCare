import { Component, Input, OnInit } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';

@Component({
    selector: 'app-provider-selectable',
    templateUrl: './provider-selectable.component.html',
    styleUrls: ['./provider-selectable.component.scss'],
})
export class ProviderSelectableComponent implements OnInit {

    providerSelected: Provider | undefined;
    disabled: boolean = true;
    // providers: Provider[] = [];
    private _providers: Provider[] = [];

    @Input() set providers(_providers: Provider[]) {
        this._providers = _providers;
    }


    constructor() { }

    ngOnInit() { }

}
