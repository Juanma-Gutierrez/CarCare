import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';

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

    ngOnInit() { }

    /**
    * Método invocado al enviar el formulario. Emite los datos del formulario a
    * través del evento onsubmit.
    */
    onSubmit() {
        console.log(this.form?.value.username, this.form?.value.password);
        this.onsubmit.emit(this.form?.value);
        this.form?.controls['password'].setValue('');
    }
}
