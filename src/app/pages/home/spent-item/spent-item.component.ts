import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpentsService } from 'src/app/core/services/api/spents.service';
import { StrapiSpent } from 'src/app/core/services/api/strapi/interfaces/strapi-spents';
@Component({
    selector: 'app-spent-item',
    templateUrl: './spent-item.component.html',
    styleUrls: ['./spent-item.component.scss'],
})
export class SpentItemComponent implements OnInit {
    @Input() spent?: StrapiSpent;
    @Output() onEditSpentClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        public spentsSvc: SpentsService
    ) { }

    ngOnInit() {
        console.log(this.spent)
    }

    onEditSpentClick(event:Event) {
        console.log("entra")
        this.onEditSpentClicked.emit();
        event.stopPropagation();
    }
}
