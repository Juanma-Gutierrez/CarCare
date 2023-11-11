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
            }
        ];
    }
}
