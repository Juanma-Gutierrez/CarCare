import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { InternalUIService } from 'src/app/core/services/internalUI.service';
import { User } from 'src/app/core/interfaces/User';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { Spent } from 'src/app/core/interfaces/Spent';
import { SpentsService } from 'src/app/core/services/api/spents.service';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { StrapiSpent } from 'src/app/core/services/api/strapi/interfaces/strapi-spents';
import { ProvidersService } from 'src/app/core/services/api/providers.service';
import { Provider } from 'src/app/core/interfaces/Provider';
import { map } from 'rxjs';
import { PaginatedProviders, StrapiProvider } from 'src/app/core/services/api/strapi/interfaces/strapi-providers';



type PaginatedSpents = Spent[]
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public filterAvailableVehicle = true;
    private user: User | null = null;
    public selectedVehicle: Vehicle | undefined;
    public providers: Provider[] = [];

    constructor(
        private modal: ModalController,
        private uiSvc: InternalUIService,
        public apiSvc: ApiService,
        public vehiclesSvc: VehiclesService,
        public spentsSvc: SpentsService,
        public providersSvc: ProvidersService,
    ) { }


    ngOnInit(): void {
        this.user = this.apiSvc.getUser();
        this.apiSvc.user$.subscribe(u => {
            this.user = u;
            this.reloadVehicles(this.user);
        })
        // Carga los proveedores
        if (this.user?.id) {
            this.providersSvc.getAll(this.user.id).pipe(
                map((paginatedProviders: PaginatedProviders) => paginatedProviders.data)).subscribe((provider: StrapiProvider[]) => {
                    this.providers = this.mapToStrapiProviderToProvider(provider);
                })
        }
    }

    private mapToStrapiProviderToProvider(strapiProviders: StrapiProvider[]): Provider[] {
        return strapiProviders.map((strapiProvider: StrapiProvider) => ({
            id: strapiProvider.id,
            name: strapiProvider.name,
            category: strapiProvider.category,
            phone: strapiProvider.phone,
            users_permissions_user: strapiProvider.users_permissions_user
        }));
    }

    // ***************************** VEHICLES *****************************

    async getVehicles(ownerId: number) {
        this.vehiclesSvc.getAll(ownerId).subscribe();
    }

    selectionChanged(event: CustomEvent) {
        switch (event.detail.value) {
            case "available": this.filterAvailableVehicle = true;
                break;
            case "all": this.filterAvailableVehicle = false;
                break;
        }
    }

    reloadVehicles(user: User | null) {
        if (user?.id)
            this.vehiclesSvc.getAll(user.id).subscribe();
    }

    public async onVehicleItemClicked(vehicle: Vehicle) {
        this.selectedVehicle = vehicle;
        if (this.user) {
            this.getSpents();
            this.spentsSvc.totalSpentsAmount$.subscribe();
            this.spentsSvc.totalSpentsNumber$.subscribe();
            this.spentsSvc.spents$.subscribe(c => {
                this.spentsSvc.calculateTotalSpents();
                this.spentsSvc.calculateNumberOfSpents();
            });
        }
    }

    onNewVehicle() {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.vehiclesSvc.addVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Vehículo creado correctamente", "success", "bottom")
                        this.reloadVehicles(this.user);
                    })
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentFormVehicles(null, onDismiss);
    }

    public async onEditVehicleClicked(vehicle: Vehicle) {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.vehiclesSvc.updateVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Vehículo actualizado", "success", "bottom")
                        this.reloadVehicles(this.user);
                    })
                }
                    break;
                case 'delete': {
                    this.vehiclesSvc.deleteVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Vehículo eliminado", "success", "bottom")
                        this.reloadVehicles(this.user);
                    })
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentFormVehicles(vehicle, onDismiss);
    }

    async presentFormVehicles(data: Vehicle | null, onDismiss: (result: any) => void) {
        const modal = await this.modal.create({
            component: VehicleFormComponent,
            componentProps: {
                vehicle: data
            },
            cssClass: "modal-w50"
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            if (result && result.data) {
                onDismiss(result);
            }
        });
    }

    // ***************************** SPENTS *****************************

    async getSpents() {
        if (this.selectedVehicle?.id) {
            this.spentsSvc.getAll(this.selectedVehicle?.id).subscribe(s => {
                for (var i = 0; i < s.data.length; i++) {
                    var temp = s.data[i];
                    var newSpent: Spent = {
                        id: temp.id,
                        date: temp.date,
                        amount: temp.amount,
                        provider: temp.provider.data.id,
                        vehicle: temp.vehicle.data.id
                    }
                    this.spentsSvc.updateSpent(newSpent)
                }
            });
        }
    }


    onNewSpent(vehicleId: number) {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.spentsSvc.addSpent(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Gasto creado correctamente", "success", "bottom")
                        if (this.user)
                            this.reloadSpents(this.user);
                    })
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentFormSpents(null, vehicleId, onDismiss);
    }

    public async onEditSpentClicked(spent: StrapiSpent) {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.spentsSvc.updateSpent(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Gasto actualizado", "success", "bottom")
                        this.reloadSpents(this.user!);
                    })
                }
                    break;
                case 'delete': {
                    this.spentsSvc.deleteSpent(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Gasto eliminado", "success", "bottom")
                        this.reloadSpents(this.user!);
                    })
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        var _spent: Spent = {
            id: spent.id,
            date: spent.date,
            amount: spent.amount,
            provider: spent.provider.data.id,
            providerName: spent.provider.data.attributes.name,
            vehicle: spent.vehicle.data.id,
            observations: spent.observations
        };
        this.presentFormSpents(_spent, _spent.vehicle, onDismiss);
    }

    reloadSpents(user: User) {
        if (user?.id) {
            this.vehiclesSvc.getAll(user.id).subscribe();
            if (this.selectedVehicle)
                this.spentsSvc.getAll(this.selectedVehicle.id).subscribe();
        }
    }

    async presentFormSpents(data: Spent | null, _vehicleId: number, onDismiss: (result: any) => void) {
        const modal = await this.modal.create({
            component: SpentFormComponent,
            componentProps: {
                spent: data,
                vehicleId: _vehicleId,
                providers: this.providers,
            },
            cssClass: "modal-w50"
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            if (result && result.data) {
                onDismiss(result);
            }
        });
    }
}


