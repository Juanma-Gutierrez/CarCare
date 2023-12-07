import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { UserCredentials } from 'src/app/core/interfaces/User-credentials';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    @Input('username') set username(value: string) {
        this.form?.controls['username'].setValue(value);
    }
    @Output() onsubmit = new EventEmitter<UserCredentials>();
    form: FormGroup | null = null;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    /**
     * Si existe algún valor en localstorage para username, lo carga en
     * this.username
     */
    ngOnInit() {
        Preferences.get({ key: 'userName' }).then((ret: any) => {
            if (ret['value']) {
                this.username = JSON.parse(ret.value);
            }
        }).catch();
    }

    /**
    * Método invocado al enviar el formulario. Emite los datos del formulario a
    * través del evento onsubmit.
    */
    onSubmit() {
        Preferences.set({
            key: 'userName',
            value: JSON.stringify(this.form?.value.username)
        })
        this.onsubmit.emit(this.form?.value);
        this.form?.controls['password'].setValue('');
    }
}
