import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorRiscoAmbiental } from './../../../model/indicador-risco-ambiental';
import { IndicadorRiscoAmbientalService } from './../indicador-risco-ambiental.service';
import { IndicadorRiscoAmbientalFilter } from './../indicador-risco-ambiental.filter';
import { IndicadorRiscoAmbientalBuilder } from './../indicador-risco-ambiental.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-indicador-risco-ambiental-form',
    templateUrl: './indicador-risco-ambiental-form.html',
    styleUrls: ['./indicador-risco-ambiental-form.css']
} )
export class IndicadorRiscoAmbientalFormComponent extends GenericFormComponent<IndicadorRiscoAmbiental> implements OnInit {
    indicadorRiscoAmbiental: IndicadorRiscoAmbiental;
    requisitos: Array<string>;
    periodicidades: Array<Periodicidade>;
    
    indicadorRiscoAmbientalFilter: IndicadorRiscoAmbientalFilter = new IndicadorRiscoAmbientalFilter();
    
    constructor( private route: ActivatedRoute,
        private indicadorRiscoAmbientalService: IndicadorRiscoAmbientalService) { 
        super(indicadorRiscoAmbientalService);
        this.goTo = "indicador-risco-ambiental";
        
        this.indicadorRiscoAmbiental = new IndicadorRiscoAmbientalBuilder().initialize(this.indicadorRiscoAmbiental);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.indicadorRiscoAmbientalService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.indicadorRiscoAmbiental = new IndicadorRiscoAmbientalBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
            
      this.indicadorRiscoAmbientalService.getRequisitos()
          .then(res => {
              this.requisitos = Object.keys(res.json());
              this.verifyAndSetRequisito();
//              console.log(Object.keys(res.json()));
          })
          .catch(error => {
              console.log(error);
          })
      
      this.indicadorRiscoAmbientalService.getPeriodicidades()
          .then(res => {
              this.periodicidades = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    
    verifyAndSetRequisito() {
        if ( this.indicadorRiscoAmbiental.getRequisito() === null || 
                this.indicadorRiscoAmbiental.getRequisito() === undefined ) {
            this.indicadorRiscoAmbiental.setRequisito('0');
        }
    }
    
    save() {
        if (this.indicadorRiscoAmbiental.getRequisito() === '0') {
            this.indicadorRiscoAmbiental.setRequisito('');
        }
        console.log(new IndicadorRiscoAmbientalBuilder().clone(this.indicadorRiscoAmbiental));
        super.save(new IndicadorRiscoAmbientalBuilder().clone(this.indicadorRiscoAmbiental));
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
