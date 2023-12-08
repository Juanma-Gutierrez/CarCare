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



type PaginatedSpents = Spent[]
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public loading = true;
    public filterAvailableVehicle = true;
    private user: User | null = null;

    public spents: StrapiSpent[] = [];
    public filteredSpent: Spent[] = [];
    public selectedVehicle: Vehicle | undefined;

    constructor(
        private modal: ModalController,
        private uiSvc: InternalUIService,
        public apiSvc: ApiService,
        public vehiclesSvc: VehiclesService,
        public spentsSvc: SpentsService
    ) { }


    ngOnInit(): void {
        this.loading = true;
        this.user = this.apiSvc.getUser();
        this.apiSvc.user$.subscribe(u => {
            this.user = u;
            this.reloadVehicles(this.user);
        })
    }

    // ***************************** VEHICLES *****************************

    async getVehicles(ownerId: number) {
        this.vehiclesSvc.getAll(ownerId).subscribe((c) => {
            this.loading = false;
        });
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
        this.presentFormVehicles(null, onDismiss);
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
                this.spents = [];
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
        console.log("nuevo gasto")
        var onDismiss = (info: any) => {
            switch (info.role) {
                case 'ok': {
                    this.spentsSvc.addSpent(info.data).subscribe(async user => {
                        console.log()
                        this.uiSvc.showToast("Gasto creado correctamente", "tertiary", "bottom")
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



    reloadSpents(user: User) {
        console.log("Entra en reloadSpents")
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
                vehicleId: _vehicleId
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


