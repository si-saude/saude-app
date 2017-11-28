import { Component, OnInit } from '@angular/core';

import { Ghe } from './../../model/ghe';
import { GheFilter } from './ghe.filter';
import { GheService } from './ghe.service';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-ghe',
  templateUrl: './ghe.component.html',
  styleUrls: ['./ghe.component.css', '../../../assets/css/list-component.css']
})
export class GheComponent extends GenericListComponent<Ghe, GheFilter> implements OnInit {

    constructor(service: GheService) {
        let gheFilter: GheFilter = new GheFilter();
        super(service, gheFilter);
    }

}
