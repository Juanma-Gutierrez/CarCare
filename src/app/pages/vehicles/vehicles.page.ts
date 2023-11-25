import { Component, Input, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
    constructor(
        public vehiclesSvc: VehiclesService
    ) { }

    ngOnInit() {
        this.getVehicles();
    }

    async getVehicles() {
        console.log("vehiculos")
        this.vehiclesSvc.getAll().subscribe();
    }

}
