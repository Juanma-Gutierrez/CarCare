import { Component, Input, OnInit } from '@angular/core';
import { UserPermission } from 'src/app/core/interfaces/user-permission';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
    private _user: UserPermission | undefined;

    @Input('user') set user(_user: UserPermission | undefined) {
        this._user = _user;
    }
    constructor() { }

    ngOnInit() { }

}
