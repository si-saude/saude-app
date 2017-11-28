import { Component } from '@angular/core';

import { Base } from './../../model/base';
import { BaseService } from './base.service';
import { BaseFilter } from './base.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css', '../../../assets/css/list-component.css']
} )
export class BaseComponent extends GenericListComponent<Base, BaseFilter> {
    
    constructor( service: BaseService ) {
        let baseFilter: BaseFilter = new BaseFilter();
        super( service, baseFilter );
    }

}