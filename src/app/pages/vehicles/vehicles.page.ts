import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { VehiclesService } from 'src/app/core/services/api/vehicles.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
    constructor(
        public vehiclesSvc: VehiclesService,
        public apiSvc: ApiService,
    ) { }

    ngOnInit() {
        this.apiSvc.user$.subscribe((user) => {
            console.log(user);
            if (user)
                this.getVehicles(user?.users_permissions_user);
            // TODO BORRAR
        })
    }

    async getVehicles(ownerId: number) {
        console.log("vehiculos")
        this.vehiclesSvc.getAll(ownerId).subscribe();
    }

}
