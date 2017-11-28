import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { Exame } from './../../model/exame';
import { ExameFilter } from './exame.filter';
import { ExameService } from './exame.service';


@Component({
  selector: 'app-exame',
  templateUrl: './exame.component.html',
  styleUrls: ['./exame.component.css', '../../../assets/css/list-component.css']
})
export class ExameComponent extends GenericListComponent<Exame, ExameFilter> {

    constructor(exameService: ExameService) {
        let exameFilter: ExameFilter = new ExameFilter();
        super(exameService, exameFilter);
    }

}