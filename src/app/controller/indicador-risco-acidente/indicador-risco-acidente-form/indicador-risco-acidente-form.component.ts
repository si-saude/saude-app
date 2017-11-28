import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorRiscoAcidente } from './../../../model/indicador-risco-acidente';
import { IndicadorRiscoAcidenteService } from './../indicador-risco-acidente.service';
import { IndicadorRiscoAcidenteFilter } from './../indicador-risco-acidente.filter';
import { IndicadorRiscoAcidenteBuilder } from './../indicador-risco-acidente.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-indicador-risco-acidente-form',
    templateUrl: './indicador-risco-acidente-form.html',
    styleUrls: ['./indicador-risco-acidente-form.css']
} )
export class IndicadorRiscoAcidenteFormComponent extends GenericFormComponent implements OnInit {
    indicadorRiscoAcidente: IndicadorRiscoAcidente;
    requisitos: Array<string>;
    periodicidades: Array<Periodicidade>;
    
    indicadorRiscoAcidenteFilter: IndicadorRiscoAcidenteFilter = new IndicadorRiscoAcidenteFilter();
    
    constructor( private route: ActivatedRoute,
        private indicadorRiscoAcidenteService: IndicadorRiscoAcidenteService) { 
        super(indicadorRiscoAcidenteService);
        this.goTo = "indicador-risco-acidente";
        
        this.indicadorRiscoAcidente = new IndicadorRiscoAcidenteBuilder().initialize(this.indicadorRiscoAcidente);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.indicadorRiscoAcidenteService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.indicadorRiscoAcidente = new IndicadorRiscoAcidenteBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
            
      this.indicadorRiscoAcidenteService.getRequisitos()
          .then(res => {
              this.requisitos = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.indicadorRiscoAcidenteService.getPeriodicidades()
          .then(res => {
              this.periodicidades = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
        
    save() {
        super.save(new IndicadorRiscoAcidenteBuilder().clone(this.indicadorRiscoAcidente));
    }   

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
