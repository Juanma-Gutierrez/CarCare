import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { Vehicle, VehicleCategory } from 'src/app/core/interfaces/vehicle';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { Provider, ProviderCategory } from 'src/app/core/interfaces/provider';
import { Service, Spent } from 'src/app/core/interfaces/spent';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public loading = true;
    public filterAvailable = true;

    // Mockup de datos locales en array
    public vehicles: Vehicle[] | undefined;
    public providers: Provider[] | undefined;
    public spents: Spent[] | undefined;
    public filteredSpent: Spent[] | undefined;
    public selectedVehicle: Vehicle | undefined;
    public totalSpentsAmount: number | undefined;
    public totalSpentsNumber: number | undefined = 0;

    constructor(
        public vehiclesService: VehiclesService,
        private toast: ToastController,
        private modal: ModalController,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.vehiclesService.getAll().subscribe((c) => {
            this.loading = false;
        });
        // TODO BORRAR
        this.crearVehiculosTemporales();
        this.crearProveedoresTemporales();
        this.crearGastosTemporales();
        this.calculateTotalSpents;
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
    public async onEditVehicleClicked(vehicle: Vehicle) {
        console.log(vehicle.brand + vehicle.model)
        var onDismiss = (info: any) => {
            console.log(info);
            switch (info.role) {
                case 'ok': {
                    this.vehiclesService.updateVehicle(info.data).subscribe(async user => {
                        const options: ToastOptions = {
                            message: "User modified",
                            duration: 1000,
                            position: 'bottom',
                            color: 'tertiary',
                            cssClass: 'card-ion-toast'
                        };
                        const toast = await this.toast.create(options);
                        toast.present();
                    })
                }
                    break;
                case 'delete': {
                    console.log("delete");
                    this.vehiclesService.deleteVehicle(info.data).subscribe(async user => {
                        const options: ToastOptions = {
                            message: "User deleted",
                            duration: 1000,
                            position: 'bottom',
                            color: 'tertiary',
                            cssClass: 'card-ion-toast'
                        };
                        const toast = await this.toast.create(options);
                        toast.present();
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

    crearVehiculosTemporales() {
        // Creación temporal de vehículos, BORRAR
        this.vehicles = [
            {
                id: 1, plate: "1122JMG", brand: "Seat", model: "León", registrationDate: new Date("2015-05-09"),
                category: VehicleCategory.car, available: false, owner: "Juanma"
            },
            {
                id: 2, plate: "2233JMG", brand: "Kia", model: "Stonic", registrationDate: new Date("2020-05-09"),
                category: VehicleCategory.car, available: true, owner: "Juanma"
            },
            {
                id: 3, plate: "1234GGG", brand: "Vespa", model: "125", registrationDate: new Date("2015-05-09"),
                category: VehicleCategory.motorcycle, available: true, owner: "Gema"
            },
            {
                id: 4, plate: "9988JGM", brand: "Kawasaki", model: "GPZ 500", registrationDate: new Date("2010-12-29"),
                category: VehicleCategory.motorcycle, available: false, owner: "Juanma"
            },
            {
                id: 5, plate: "8877JGM", brand: "Skoda", model: "Fabia", registrationDate: new Date("2008-08-21"),
                category: VehicleCategory.car, available: true, owner: "Juanma"
            },
            {
                id: 6, plate: "4455GGG", brand: "Volkswagen", model: "Golf", registrationDate: new Date("2014-07-13"),
                category: VehicleCategory.car, available: true, owner: "Gema"
            },
            {
                id: 7, plate: "4421LGG", brand: "Honda", model: "CBR 125", registrationDate: new Date("2013-07-08"),
                category: VehicleCategory.motorcycle, available: false, owner: "Laura"
            }
        ];
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

