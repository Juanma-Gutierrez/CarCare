import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';
import { Provider, ProviderCategory } from 'src/app/core/interfaces/provider';
import { ApiService } from 'src/app/core/services/api/api.service';
import { InternalUIService } from 'src/app/core/services/internalUI.service';
import { User } from 'src/app/core/interfaces/user';
import { VehicleFormComponent } from './vehicle-form/vehicle-formcomponent';
import { Spent } from 'src/app/core/interfaces/spent';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public loading = true;
    public filterAvailable = true;
    private user: User | null = null;


    // Mockup de datos locales en array
    // public vehicles: Vehicle[] | undefined;
    public providers: Provider[] | undefined;
    public spents: Spent[] | undefined;
    public filteredSpent: Spent[] | undefined;
    public selectedVehicle: Vehicle | undefined;
    public totalSpentsAmount: number | undefined;
    public totalSpentsNumber: number | undefined = 0;

    constructor(
        public vehiclesSvc: VehiclesService,
        private modal: ModalController,
        public apiSvc: ApiService,
        private uiSvc: InternalUIService,
    ) { }


    ngOnInit(): void {
        this.loading = true;
        var user = this.apiSvc.getUser()
        this.apiSvc.user$.subscribe(u => {
            this.user = u
            this.reloadVehicles(this.user)
            this.calculateTotalSpents;
        })
    }

    async getVehicles(ownerId: number) {
        this.vehiclesSvc.getAll(ownerId).subscribe((c) => {
            this.loading = false;
        });
    }

    selectionChanged(event: CustomEvent) {
        switch (event.detail.value) {
            case "available": this.filterAvailable = true;
                break;
            case "all": this.filterAvailable = false;
                break;
        }
    }

    reloadVehicles(user: User | null) {
        if (user?.id)
            this.vehiclesSvc.getAll(user.id).subscribe();
    }

    public async onVehicleItemClicked(vehicle: Vehicle) {
        this.selectedVehicle = vehicle;
        this.filteredSpent = this.spents?.filter(spent => spent.vehicle == this.selectedVehicle?.id);
        this.calculateTotalSpents();
        this.reloadSpents();
    }
    reloadSpents() {
        console.log("Entra en reloadSpents")
    }

    onNewVehicle() {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.vehiclesSvc.addVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Vehículo creado correctamente", "tertiary", "bottom")
                        this.reloadVehicles(this.user);
                    })
                    break;
                }
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentForm(null, onDismiss);
    }

    public async onEditVehicleClicked(vehicle: Vehicle) {
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.vehiclesSvc.updateVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Vehículo actualizado", "tertiary", "bottom")
                        this.reloadVehicles(this.user);
                    })
                }
                    break;
                case 'delete': {
                    this.vehiclesSvc.deleteVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("Vehículo eliminado", "tertiary", "bottom")
                        this.reloadVehicles(this.user);
                    })
                }
                    break;
                default: {
                    console.error("No debería entrar");
                }
            }
        }
        this.presentForm(vehicle, onDismiss);
    }

    async presentForm(data: Vehicle | null, onDismiss: (result: any) => void) {
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

    calculateTotalSpents() {
        this.totalSpentsAmount = this.filteredSpent?.reduce((total, spent) => total + spent.amount, 0);
        this.totalSpentsNumber = this.filteredSpent?.length;
    }
}

