import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorRiscoErgonomico } from './../../../model/indicador-risco-ergonomico';
import { IndicadorRiscoErgonomicoService } from './../indicador-risco-ergonomico.service';
import { IndicadorRiscoErgonomicoFilter } from './../indicador-risco-ergonomico.filter';
import { IndicadorRiscoErgonomicoBuilder } from './../indicador-risco-ergonomico.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-indicador-risco-ergonomico-form-detail',
    templateUrl: './indicador-risco-ergonomico-form-detail.html',
    styleUrls: ['./indicador-risco-ergonomico-form.css', './../../../../assets/css/form-component.css']
} )
export class IndicadorRiscoErgonomicoFormDetailComponent extends GenericFormComponent implements OnInit {
    indicadorRiscoErgonomico: IndicadorRiscoErgonomico;
    requisitos: Array<string>;
    periodicidades: Array<Periodicidade>;
    
    indicadorRiscoErgonomicoFilter: IndicadorRiscoErgonomicoFilter = new IndicadorRiscoErgonomicoFilter();
    
    constructor( private route: ActivatedRoute,
        private indicadorRiscoErgonomicoService: IndicadorRiscoErgonomicoService,
        router: Router) { 
        super(indicadorRiscoErgonomicoService, router);
        this.goTo = "indicador-risco-ergonomico";
        
        this.indicadorRiscoErgonomico = new IndicadorRiscoErgonomicoBuilder().initialize(this.indicadorRiscoErgonomico);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.indicadorRiscoErgonomicoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.indicadorRiscoErgonomico = new IndicadorRiscoErgonomicoBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
            
      this.indicadorRiscoErgonomicoService.getRequisitos()
          .then(res => {
              this.requisitos = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.indicadorRiscoErgonomicoService.getPeriodicidades()
          .then(res => {
              this.periodicidades = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
