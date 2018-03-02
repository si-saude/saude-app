import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RiscoGhe } from './../../model/risco-ghe';
import { RiscoGheService } from './risco-ghe.service';
import { RiscoGheFilter } from './risco-ghe.filter';
import { RiscoGheGuard } from './../../guards/guards-child/risco-ghe.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-risco-ghe',
  templateUrl: './risco-ghe.component.html',
  styleUrls: ['./risco-ghe.component.css', '../../../assets/css/list-component.css']
})
export class RiscoGheComponent extends GenericListComponent<RiscoGhe, RiscoGheFilter, RiscoGheGuard> {

    constructor( service: RiscoGheService, riscoGuard: RiscoGheGuard, router: Router ) {
        super( service, new RiscoGheFilter(), riscoGuard, router );
    }

}
