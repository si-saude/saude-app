import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import 'rxjs/add/operator/toPromise';

import { Profissiograma } from './../../model/profissiograma';
import { ProfissiogramaBuilder } from './../profissiograma/profissiograma.builder';
import { GlobalVariable } from './../../global';
import { Convocacao } from './../../model/convocacao';
import { ConvocacaoService } from './convocacao.service';
import { ConvocacaoFilter } from './convocacao.filter';
import { ConvocacaoGuard } from './../../guards/guards-child/convocacao.guard';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-convocacao',
  templateUrl: './convocacao.component.html',
  styleUrls: ['./convocacao.component.css', '../../../assets/css/list-component.css']
})
export class ConvocacaoComponent extends GenericListComponent<Convocacao, ConvocacaoFilter, ConvocacaoGuard> {
    tipos: Array<string>;
    profissiogramas: Array<Profissiograma>;

    constructor(service: ConvocacaoService, convocacaoGuard: ConvocacaoGuard, router: Router) {
      super(service, new ConvocacaoFilter(), convocacaoGuard, router);
      
      this.tipos = new Array<string>(); 
      this.profissiogramas = new ProfissiogramaBuilder().initializeList( Array<Profissiograma>() );

      service.getTipos()
          .then( res => {
              this.tipos = Object.keys( res.json() );
          } )
          .catch( error => {
              console.log( error );
          } )
      
      service.getProfissiogramas()
          .then( res => {
              this.profissiogramas = new ProfissiogramaBuilder().cloneList( res.json() );
          } )
          .catch( error => {
              console.log( error );
          } )
  }
    
}