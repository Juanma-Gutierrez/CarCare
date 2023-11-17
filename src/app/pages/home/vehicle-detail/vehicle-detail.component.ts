import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';

@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrls: ['./vehicle-detail.component.scss'],
})
export class VehicleDetailComponent implements OnInit {

    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';

    @Input() set vehicle(_vehicle: Vehicle | null) {
        if (_vehicle) {
            this.mode = 'Edit';
            //         this.form.controls['id'].setValue(_user.id);

        }
    }
    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            id: [null],
            plate: ['', Validators.required],
            brand: ['', Validators.required],
            model: ['', Validators.required],
            registrationDate: [Date],
            category: ['', Validators.required],
            available: ['', Validators.required],
            owner: ['', Validators.required],
            spents: []
        })
    }

    ngOnInit() { }

    onCancel() {
        this._modal.dismiss(null, 'cancel');
    }

    onSubmit() {
        this._modal.dismiss(this.form.value, 'ok');
    }

    onDelete() {
        this._modal.dismiss(this.form.value, 'delete');
    }
}
