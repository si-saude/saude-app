import { Component } from '@angular/core';

import { Base } from './../../model/base';
import { BaseService } from './base.service';
import { BaseFilter } from './base.filter';
import { BaseGuard } from './../../guards/guards-child/base.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component( {
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css', '../../../assets/css/list-component.css']
} )
export class BaseComponent extends GenericListComponent<Base, BaseFilter, BaseGuard> {

    constructor( service: BaseService, baseGuard: BaseGuard ) {
        super( service, new BaseFilter(), baseGuard );
    }

}