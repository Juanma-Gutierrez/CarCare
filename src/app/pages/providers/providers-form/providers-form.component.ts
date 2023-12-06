import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Provider } from 'src/app/core/interfaces/provider';
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
        console.log(_provider)
        if (_provider) {
            this.mode = 'Edit';
            this.form.controls['id'].setValue(_provider.id);
            this.form.controls['name'].setValue(_provider.name);
            this.form.controls['category'].setValue(_provider.category);
            this.form.controls['phone'].setValue(_provider.phone);
        }
    }

    constructor(
        private _modal: ModalController,
        private formBuilder: FormBuilder,
        private apiSvc: ApiService,
    ) {
        var user = apiSvc.getUser()
        console.log(user)
        var providerUserPermissionsId = user?.users_permissions_user
        this.form = this.formBuilder.group({
            id: [null],
            name: ['', Validators.required],
            category: ['', Validators.required],
            phone: [''],
            providerUserPermissions: [providerUserPermissionsId]
        })
    }

    ngOnInit() { }

    onCancel() {
        console.log("onCancel");
        this._modal.dismiss(null, 'cancel');
    }

    onSubmit() {
        console.log("onSubmit");
        this._modal.dismiss(this.form.value, 'ok');
    }

    onDelete() {
        console.log("onDelete");
        this._modal.dismiss(this.form.value, 'delete');
    }
}
