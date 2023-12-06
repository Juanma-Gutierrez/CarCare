import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { PaginatedProviders, StrapiProvider } from './strapi/interfaces/strapi-providers';
import { DataService } from './data.service';
import { MappingService } from './mapping.service';
import { environment } from 'src/environments/environment';
import { Provider } from '../../interfaces/provider';

interface CrudProviders {
    getAll(ownerId: number): Observable<PaginatedProviders>;
    addProvider(provider: Provider): Observable<Provider>;
    updateProvider(provider: Provider): Observable<Provider>;
    deleteProvider(provider: Provider): Observable<Provider>;
}
@Injectable({
    providedIn: 'root'
})
export class ProvidersService {
    private _providers: BehaviorSubject<PaginatedProviders> = new BehaviorSubject<PaginatedProviders>({ data: [], pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } });
    public providers$: Observable<PaginatedProviders> = this._providers.asObservable();

    constructor(
        private dataSvc: DataService,
        private mapping: MappingService,
    ) { }

    public getAll(userId: number): Observable<PaginatedProviders> {
        // Filtra los proveedores del propietario registrado
        const apiUrl = "api/providers?populate=users_permissions_user&filters[users_permissions_user][id]=" + userId;
        // Si coincide el tipo de datos que recibo con mi interfaz
        var obs = this.dataSvc.query<any>(apiUrl, {}).pipe(tap(response => {
            this._providers.next(response)
        }))
        return obs;
    }

    addProvider(provider: Provider): Observable<Provider> {
        console.log("addProvider")
        const endPoint = "api/providers";
        console.table(provider);
        console.log(provider.users_permissions_user)
        var _provider: any = {
            name: provider.name,
            category: provider.category,
            phone: provider.phone,
            users_permissions_user: provider.users_permissions_user,
        }
        console.table(_provider)
        return this.dataSvc.post<Provider>(endPoint, _provider);
    }


    updateProvider(provider: Provider): Observable<Provider> {
        console.log("updateVehicle", provider)
        return this.dataSvc.put<any>(this.mapping.updateProviderUrl(provider.id!), provider).pipe(map(this.mapping.mapProvider.bind(this.mapping)));
    }

    deleteProvider(provider: Provider): Observable<Provider> {
        console.log("deleteVehicle", provider)
        return this.dataSvc.delete<any>(this.mapping.deleteVehicleUrl(provider.id!)).pipe(map(this.mapping.mapProvider.bind(this.mapping)));
    }
}
