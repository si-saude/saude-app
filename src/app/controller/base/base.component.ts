import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Base } from '../../model/base';
import { BaseService } from '../base/base.service';
import { BaseFilter } from '../base/base.filter';
import { BaseGuard } from '../../guards/guards-child/base.guard';
import { GenericListComponent } from '../../generics/generic.list.component';

@Component( {
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css', '../../../assets/css/list-component.css']
} )
export class BaseComponent extends GenericListComponent<Base, BaseFilter, BaseGuard> {

    constructor( service: BaseService, baseGuard: BaseGuard, router: Router ) {
        super( service, new BaseFilter(), baseGuard, router );
    }
    
}