import { Component, Input, OnInit } from '@angular/core';
import { Spent } from 'src/app/core/interfaces/spent';
@Component({
    selector: 'app-spent-item',
    templateUrl: './spent-item.component.html',
    styleUrls: ['./spent-item.component.scss'],
})
export class SpentItemComponent implements OnInit {
    @Input() spent?: Spent;

    constructor() { }

    ngOnInit() { }

}
