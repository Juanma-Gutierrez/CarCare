import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonPopover, ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { Spent } from 'src/app/core/interfaces/Spent';
import { Vehicle } from 'src/app/core/interfaces/Vehicle';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';

@Component({
    selector: 'app-spent-form',
    templateUrl: './spent-form.component.html',
    styleUrls: ['./spent-form.component.scss'],
})
export class SpentFormComponent implements OnInit {

    today: Date = new Date()
    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    selectedProvider?: Provider | undefined;

    private _vehicle: number = -1;
    @Input() set vehicleId(vehiclePassed: number) {
        this._vehicle = vehiclePassed;{}
        this.form.controls['vehicle'].setValue(this._vehicle);
    };
    @Input() set spent(_spent: Spent | null) {
        if (_spent) {
            this.mode = 'Edit';
            this.form.controls['id'].setValue(_spent.id);
            this.form.controls['date'].setValue(_spent.date);
            this.form.controls['amount'].setValue(_spent.amount.toPrecision());
            this.form.controls['provider'].setValue(_spent.provider);
            this.form.controls['providerName'].setValue(_spent.providerName);
            this.form.controls['vehicle'].setValue(_spent.vehicle);
            this.form.controls['observations'].setValue(_spent.observations);
        }
    }

    @Input() providers: Provider[] = [];
    public providerName?: String;

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            id: [null],
            date: [this.today.toISOString(), Validators.required],
            amount: ['', Validators.required],
            provider: [0, Validators.required],
            providerName: ['', Validators.required],
            vehicle: [this._vehicle],
            observations: ['']
        })
    }
    getVehicle(): number {
        return this._vehicle
    }

    ngOnInit() {
        this.providerName = this.spent?.providerName;
    }

    onSelection(event: any) {
        const provider = event.detail.value;
        this.form.controls['providerName'].setValue(provider?.name);
        this.form.controls['provider'].setValue(provider?.id);
        this.form.markAsDirty();
    }

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