import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleCategory } from 'src/app/core/interfaces/Vehicle';
import { VehicleService } from 'src/app/core/services/vehicle.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public loading = true;
    public borrarVehiculos: Vehicle[] | undefined;
    public filterAvailable = true;

    constructor(
        public vehicleService: VehicleService,
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.vehicleService.getAll().subscribe((c) => {
            this.loading = false;
        });
        // BORRAR
        this.crearVehiculosTemporales();
    }

    selectionChanged(event: CustomEvent) {
        console.log(event.detail.value);
        switch (event.detail.value) {
            case "available": this.filterAvailable = true;
                break;
            case "all": this.filterAvailable = false;
                break;
        }
    }


    crearVehiculosTemporales() {
        // Creación temporal de vehículos, BORRAR
        this.borrarVehiculos = [
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
}
