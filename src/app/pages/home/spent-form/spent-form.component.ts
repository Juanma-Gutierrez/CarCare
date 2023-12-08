import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Spent } from 'src/app/core/interfaces/Spent';

@Component({
    selector: 'app-spent-form',
    templateUrl: './spent-form.component.html',
    styleUrls: ['./spent-form.component.scss'],
})
export class SpentFormComponent implements OnInit {

    today: Date = new Date()
    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    private _vehicle: number = -1;

    @Input() set vehicleId(vehiclePassed: number) {
        this._vehicle = vehiclePassed;
        console.log(this._vehicle)
        this.form.controls['vehicle'].setValue(this._vehicle);
    };
    @Input() set spent(_spent: Spent | null) {
        if (_spent) {
            this.mode = 'Edit';
            var vehic = this.getVehicle();
            console.log(vehic)
            this.form.controls['id'].setValue(_spent.id);
            this.form.controls['date'].setValue(_spent.date);
            this.form.controls['amount'].setValue(_spent.amount);
            this.form.controls['provider'].setValue(_spent.provider);
            this.form.controls['vehicle'].setValue(this._vehicle);
            this.form.controls['observations'].setValue(_spent.observations);
        }
    }
    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            id: [null],
            date: [this.today.toISOString(), Validators.required],
            amount: ['', Validators.required],
            provider: ['', Validators.required],
            vehicle: [this._vehicle],
            observations: ['']
        })
    }
    getVehicle(): number {
        console.log(this._vehicle)
        return this._vehicle
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