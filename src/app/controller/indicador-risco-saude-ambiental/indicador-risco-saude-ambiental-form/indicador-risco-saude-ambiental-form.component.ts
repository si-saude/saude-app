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
export class IndicadorRiscoSaudeAmbientalFormComponent extends GenericFormComponent<IndicadorRiscoSaudeAmbiental> implements OnInit {
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
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
            
      this.indicadorRiscoSaudeAmbientalService.getRequisitos()
          .then(res => {
              this.requisitos = Object.keys(res.json());
              this.verifyAndSetRequisito();
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
    
    verifyAndSetRequisito() {
        if ( this.indicadorRiscoSaudeAmbiental.getRequisito() === null || 
                this.indicadorRiscoSaudeAmbiental.getRequisito() === undefined ) {
            this.indicadorRiscoSaudeAmbiental.setRequisito('0');
        }
    }
    
    save() {
        if (this.indicadorRiscoSaudeAmbiental.getRequisito() === '0') {
            this.indicadorRiscoSaudeAmbiental.setRequisito('');
        }
        console.log(new IndicadorRiscoSaudeAmbientalBuilder().clone(this.indicadorRiscoSaudeAmbiental));
        super.save(new IndicadorRiscoSaudeAmbientalBuilder().clone(this.indicadorRiscoSaudeAmbiental));
    }   


    isPossibleDeactivate() {
//        if ( this.formulario.dirty ) {
//            return false;
//        } else return true;
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}