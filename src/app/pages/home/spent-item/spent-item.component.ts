import { Component, Input, OnInit } from '@angular/core';
import { Spent } from 'src/app/core/interfaces/Spent';
import { StrapiSpent } from 'src/app/core/services/api/strapi/interfaces/strapi-spents';
@Component({
    selector: 'app-spent-item',
    templateUrl: './spent-item.component.html',
    styleUrls: ['./spent-item.component.scss'],
})
export class SpentItemComponent implements OnInit {
    @Input() spent?: StrapiSpent;

    constructor() { }

    ngOnInit() {
        console.log(this.spent)
    }

}
