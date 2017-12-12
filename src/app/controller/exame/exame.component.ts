import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { Exame } from './../../model/exame';
import { ExameFilter } from './exame.filter';
import { ExameGuard } from './../../guards/guards-child/exame.guard';
import { ExameService } from './exame.service';


@Component({
  selector: 'app-exame',
  templateUrl: './exame.component.html',
  styleUrls: ['./exame.component.css', '../../../assets/css/list-component.css']
})
export class ExameComponent extends GenericListComponent<Exame, ExameFilter, ExameGuard> {

    constructor(exameService: ExameService, exameGuard: ExameGuard) {
        super(exameService, new ExameFilter(), exameGuard);
    }

}