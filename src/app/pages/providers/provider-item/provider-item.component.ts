import { ApiService } from 'src/app/core/services/api/api.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provider } from 'src/app/core/interfaces/Provider';
import { ProvidersService } from 'src/app/core/services/api/providers.service';

@Component({
    selector: 'app-provider-item',
    templateUrl: './provider-item.component.html',
    styleUrls: ['./provider-item.component.scss'],
})
export class ProviderItemComponent implements OnInit {
    @Input() provider?: Provider
    @Output() onEditProviderClicked: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor del componente.
     * @constructor
     * @param {ProvidersService} providerSvc - Servicio para gestionar operaciones relacionadas con proveedores.
     * @param {ApiService} apiSvc - Servicio para realizar operaciones generales de la API.
     */
    constructor(
        public providerSvc: ProvidersService,
        public apiSvc: ApiService,
    ) { }

    ngOnInit() { }

    /**
     * Maneja el evento de clic en el botón de editar proveedor.
     * Emite el evento onEditProviderClicked y detiene la propagación del evento original.
     * @method onEditProviderClick
     * @param {Event} event - Objeto de evento del clic.
     * @return {void}
     */
    public async onEditProviderClick(event: Event) {
        this.onEditProviderClicked.emit();
        event.stopPropagation();
    }
}
