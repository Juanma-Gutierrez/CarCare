import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterInfo } from 'src/app/core/interfaces/user';
import { PasswordValidation } from 'src/app/core/validators/PasswordValidation';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
    form: FormGroup | null = null;
    @Output() onsubmit = new EventEmitter<UserRegisterInfo>();

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, PasswordValidation.passwordProto('password')]],
            confirm: ['', [Validators.required, PasswordValidation.passwordProto('confirm')]]
        }, { validator: [PasswordValidation.passwordMatch('password', 'confirm')] });
    }

    ngOnInit() { }

    onSubmit() {
        console.log(this.form?.value.username, this.form?.value.password);
        this.onsubmit.emit(this.form?.value);
    }

    hasError(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.invalid;
    }

    hasTouched(controlName: string): boolean | undefined {
        return this.form?.get(controlName)?.touched;
    }
}
