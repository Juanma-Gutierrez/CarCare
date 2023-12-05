import { Component, OnInit } from '@angular/core';
import { ModalController  } from '@ionic/angular';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { Provider, ProviderCategory } from 'src/app/core/interfaces/provider';
import { Service, Spent } from 'src/app/core/interfaces/spent';
import { ApiService } from 'src/app/core/services/api/api.service';
import { InternalUIService } from 'src/app/core/services/internalUI.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public loading = true;
    public filterAvailable = true;

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
        console.log(user)
        this.apiSvc.user$.subscribe(v => {
            console.log(v);
            if (user)
                this.getVehicles(user?.users_permissions_user);
            // TODO BORRAR
            this.crearProveedoresTemporales();
            this.crearGastosTemporales();
            this.calculateTotalSpents;
        })
    }

    async getVehicles(ownerId: number) {
        console.log("getVehicles", this.loading)
        this.vehiclesSvc.getAll(ownerId).subscribe((c) => {
            console.log("carga los vehiculos")
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

    public async onVehicleItemClicked(vehicle: Vehicle) {
        console.log(vehicle.brand + vehicle.model)
        this.selectedVehicle = vehicle;
        this.filteredSpent = this.spents?.filter(spent => spent.vehicle == this.selectedVehicle?.id);
        this.calculateTotalSpents();
    }

    onNewVehicle() {
        console.log("homePage.onNewVehicle")
        var onDismiss = (info: any) => {
            console.log(info);
            switch (info.role) {
                case 'ok': {
                    this.vehiclesSvc.addVehicle(info.data).subscribe(async user => {
                        this.loadVehicles();
                        this.uiSvc.showToast("Vehículo creado correctamente", "tertiary", "bottom")
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

    private loadVehicles(page: number = 0, refresher: any = null) {
        this.vehiclesSvc.query("").subscribe({
            next: response => {
                console.log(response.data)
            },
            error: err => {
                console.log(err)
            }
        });
    }

    public async onEditVehicleClicked(vehicle: Vehicle) {
        console.log(vehicle.brand + vehicle.model)
        var onDismiss = (info: any) => {
            console.log(info);
            console.log(info.role)
            switch (info.role) {
                case 'ok': {
                    this.vehiclesSvc.updateVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("User modified", "tertiary", "bottom")
                    })
                }
                    break;
                case 'delete': {
                    console.log("delete");
                    this.vehiclesSvc.deleteVehicle(info.data).subscribe(async user => {
                        this.uiSvc.showToast("User deleted", "tertiary", "bottom")
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
            component: VehicleDetailComponent,
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

    crearProveedoresTemporales() {
        this.providers
            = [
                { id: 1, name: "Repsol", category: ProviderCategory.fuelStation, phone: "952442354", spents: [] },
                { id: 2, name: "Cepsa", category: ProviderCategory.fuelStation, phone: "", spents: [] },
                { id: 3, name: "Línea Directa Aseguradora", category: ProviderCategory.insuranceCenter, phone: "952442354", spents: [] },
                { id: 4, name: "Aurgi", category: ProviderCategory.workshop, phone: "952112233", spents: [] },
                { id: 5, name: "Talleres Hermanos Gómez", category: ProviderCategory.workshop, phone: "952665577", spents: [] },
                { id: 6, name: "ITV", category: ProviderCategory.workshop, phone: "952665577", spents: [] },

            ]
    }
    crearGastosTemporales() {
        this.spents = [
            {
                id: 1, date: new Date("2023-09-14"), amount: 30.40, observations: "", service: Service.refuelling, provider: 1, vehicle: 1
            },
            {
                id: 2, date: new Date("2023-03-08"), amount: 40.00, observations: "", service: Service.refuelling, provider: 2, vehicle: 2
            },
            {
                id: 3, date: new Date("2023-05-24"), amount: 240.35, observations: "Seguro anual", service: Service.insurance, provider: 3, vehicle: 3
            },
            {
                id: 4, date: new Date("2023-06-10"), amount: 20.00, observations: "", service: Service.refuelling, provider: 2, vehicle: 3
            },
            {
                id: 5, date: new Date("2023-07-12"), amount: 325.15, observations: "Cambio de batería y neumáticos", service: Service.repair, provider: 5, vehicle: 2
            },
            {
                id: 6, date: new Date("2023-08-21"), amount: 25, observations: "", service: Service.refuelling, provider: 2, vehicle: 1
            },
            {
                id: 7, date: new Date("2023-09-01"), amount: 20, observations: "", service: Service.refuelling, provider: 1, vehicle: 4
            },
            {
                id: 8, date: new Date("2023-09-05"), amount: 40, observations: "", service: Service.refuelling, provider: 2, vehicle: 5
            },
            {
                id: 9, date: new Date("2023-09-12"), amount: 44.75, observations: "Fallan las luces", service: Service.refuelling, provider: 6, vehicle: 6
            },
            {
                id: 10, date: new Date("2023-06-12"), amount: 40, observations: "", service: Service.refuelling, provider: 1, vehicle: 5
            },
            {
                id: 11, date: new Date("2023-07-21"), amount: 45, observations: "", service: Service.refuelling, provider: 2, vehicle: 2
            },
            {
                id: 12, date: new Date("2023-05-17"), amount: 25, observations: "", service: Service.refuelling, provider: 1, vehicle: 2
            },
            {
                id: 13, date: new Date("2023-09-14"), amount: 1250, observations: "Reparación del accidenten en la autovía", service: Service.repair, provider: 5, vehicle: 2
            },
            {
                id: 14, date: new Date("2023-09-30"), amount: 30, observations: "", service: Service.refuelling, provider: 2, vehicle: 5
            },
        ]
    }
}

