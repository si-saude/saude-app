import { Component, OnInit } from '@angular/core';

import { Ghee } from './../../model/ghee';
import { GheeFilter } from './ghee.filter';
import { GheeService } from './ghee.service';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-ghee',
  templateUrl: './ghee.component.html',
  styleUrls: ['./ghee.component.css', '../../../assets/css/list-component.css']
})
export class GheeComponent extends GenericListComponent<Ghee, GheeFilter> implements OnInit {

    constructor(service: GheeService) {
        let gheeFilter: GheeFilter = new GheeFilter();
        super(service, gheeFilter);
    }

}
