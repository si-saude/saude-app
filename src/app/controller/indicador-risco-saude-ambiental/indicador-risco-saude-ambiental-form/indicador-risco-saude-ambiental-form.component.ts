import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorRiscoSaudeAmbiental } from './../../../model/indicador-risco-saude-ambiental';
import { IndicadorRiscoSaudeAmbientalService } from './../indicador-risco-saude-ambiental.service';
import { IndicadorRiscoSaudeAmbientalFilter } from './../indicador-risco-saude-ambiental.filter';
import { IndicadorRiscoSaudeAmbientalBuilder } from './../indicador-risco-saude-ambiental.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-indicador-risco-saude-ambiental-form',
    templateUrl: './indicador-risco-saude-ambiental-form.html',
    styleUrls: ['./indicador-risco-saude-ambiental-form.css']
} )
export class IndicadorRiscoSaudeAmbientalFormComponent extends GenericFormComponent implements OnInit {
    indicadorRiscoSaudeAmbiental: IndicadorRiscoSaudeAmbiental;
    requisitos: Array<string>;
    periodicidades: Array<Periodicidade>;
    
    indicadorRiscoSaudeAmbientalFilter: IndicadorRiscoSaudeAmbientalFilter = new IndicadorRiscoSaudeAmbientalFilter();
    
    constructor( private route: ActivatedRoute,
        private indicadorRiscoSaudeAmbientalService: IndicadorRiscoSaudeAmbientalService) { 
        super(indicadorRiscoSaudeAmbientalService);
        this.goTo = "indicador-risco-saude-ambiental";
        
        this.indicadorRiscoSaudeAmbiental = new IndicadorRiscoSaudeAmbientalBuilder().initialize(this.indicadorRiscoSaudeAmbiental);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.indicadorRiscoSaudeAmbientalService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.indicadorRiscoSaudeAmbiental = new IndicadorRiscoSaudeAmbientalBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
            
      this.indicadorRiscoSaudeAmbientalService.getRequisitos()
          .then(res => {
              this.requisitos = Object.keys(res.json());
//              console.log(Object.keys(res.json()));
          })
          .catch(error => {
              console.log(error);
          })
      
      this.indicadorRiscoSaudeAmbientalService.getPeriodicidades()
          .then(res => {
              this.periodicidades = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    
    save() {
        super.save(new IndicadorRiscoSaudeAmbientalBuilder().clone(this.indicadorRiscoSaudeAmbiental));
    }   
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
