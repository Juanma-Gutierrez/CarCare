import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/Provider';
import { User } from 'src/app/core/interfaces/User';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
    selector: 'app-providers-form',
    templateUrl: './providers-form.component.html',
    styleUrls: ['./providers-form.component.scss'],
})
export class ProvidersFormComponent implements OnInit {

    form: FormGroup;
    mode: 'New' | 'Edit' = 'New';
    @Input() set provider(_provider: Provider | null) {
        if (_provider) {
            this.mode = 'Edit';
            this.form.controls['id'].setValue(_provider.id);
            this.form.controls['name'].setValue(_provider.name);
            this.form.controls['category'].setValue(_provider.category);
            this.form.controls['phone'].setValue(_provider.phone);
            this.form.controls['users_permissions_user'].setValue(_provider.users_permissions_user)
        }
    }

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private apiSvc: ApiService,
    ) {
        var user = apiSvc.getUser()
        var userId = user?.id
        this.form = this.formBuilder.group({
            id: [null],
            name: ['', Validators.required],
            category: ['', Validators.required],
            phone: [''],
            users_permissions_user: [userId]
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
