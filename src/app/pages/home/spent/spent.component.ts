import { Component, Input, OnInit } from '@angular/core';
import { Spent } from 'src/app/core/interfaces/Spent';

@Component({
    selector: 'app-spent',
    templateUrl: './spent.component.html',
    styleUrls: ['./spent.component.scss'],
})
export class SpentComponent implements OnInit {
    @Input() spent?: Spent;

    constructor() { }

    ngOnInit() { }

}
