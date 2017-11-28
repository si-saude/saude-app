import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorRiscoSanitario } from './../../../model/indicador-risco-sanitario';
import { IndicadorRiscoSanitarioService } from './../indicador-risco-sanitario.service';
import { IndicadorRiscoSanitarioFilter } from './../indicador-risco-sanitario.filter';
import { IndicadorRiscoSanitarioBuilder } from './../indicador-risco-sanitario.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-indicador-risco-sanitario-form',
    templateUrl: './indicador-risco-sanitario-form.html',
    styleUrls: ['./indicador-risco-sanitario-form.css']
} )
export class IndicadorRiscoSanitarioFormComponent extends GenericFormComponent implements OnInit {
    indicadorRiscoSanitario: IndicadorRiscoSanitario;
    requisitos: Array<string>;
    periodicidades: Array<Periodicidade>;
    
    indicadorRiscoSanitarioFilter: IndicadorRiscoSanitarioFilter = new IndicadorRiscoSanitarioFilter();
    
    constructor( private route: ActivatedRoute,
        private indicadorRiscoSanitarioService: IndicadorRiscoSanitarioService) { 
        super(indicadorRiscoSanitarioService);
        this.goTo = "indicador-risco-sanitario";
        
        this.indicadorRiscoSanitario = new IndicadorRiscoSanitarioBuilder().initialize(this.indicadorRiscoSanitario);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.indicadorRiscoSanitarioService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.indicadorRiscoSanitario = new IndicadorRiscoSanitarioBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
            
      this.indicadorRiscoSanitarioService.getRequisitos()
          .then(res => {
              this.requisitos = Object.keys(res.json());
//              console.log(Object.keys(res.json()));
          })
          .catch(error => {
              console.log(error);
          })
      
      this.indicadorRiscoSanitarioService.getPeriodicidades()
          .then(res => {
              this.periodicidades = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    
    save() {
        super.save(new IndicadorRiscoSanitarioBuilder().clone(this.indicadorRiscoSanitario));
    }   

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
