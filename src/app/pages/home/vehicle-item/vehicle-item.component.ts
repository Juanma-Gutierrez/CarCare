import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle-item.component.html',
    styleUrls: ['./vehicle-item.component.scss'],
})
export class VehicleItemComponent implements OnInit {
    @Input() vehicle?: Vehicle;
    @Output() onVehicleItemClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() onEditVehicleClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    onEditVehicleClick(event: any) {
        console.log("Editar vehiculo")
        this.onEditVehicleClicked.emit();
        event.stopPropagation();
    }

    onVehicleItemClick(event: any) {
        console.log("Click vehículo")
        this.onVehicleItemClicked.emit();
        event.stopPropagation();
    }
}
