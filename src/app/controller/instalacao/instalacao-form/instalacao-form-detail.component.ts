import { Component, OnInit, ViewChild } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';  

import { GlobalVariable } from './../../../global'; 
import { Instalacao } from './../../../model/instalacao'; 
import { InstalacaoService } from './../instalacao.service';
import { InstalacaoFilter } from './../instalacao.filter';
import { InstalacaoBuilder } from './../instalacao.builder';
import { IndicadorRiscoAcidente } from './../../../model/indicador-risco-acidente';
import { IndicadorRiscoAmbiental } from './../../../model/indicador-risco-ambiental';
import { IndicadorRiscoErgonomico } from './../../../model/indicador-risco-ergonomico';
import { IndicadorRiscoSanitario } from './../../../model/indicador-risco-sanitario';
import { IndicadorRiscoSaudeAmbiental } from './../../../model/indicador-risco-saude-ambiental';
import { IndicadorRiscoAcidenteFilter } from './../../indicador-risco-acidente/indicador-risco-acidente.filter';
import { IndicadorRiscoAcidenteInstalacao } from './../../../model/indicador-risco-acidente-instalacao';
import { IndicadorRiscoAmbientalInstalacao } from './../../../model/indicador-risco-ambiental-instalacao';
import { IndicadorRiscoErgonomicoInstalacao } from './../../../model/indicador-risco-ergonomico-instalacao';
import { IndicadorRiscoSanitarioInstalacao } from './../../../model/indicador-risco-sanitario-instalacao';
import { IndicadorRiscoSaudeAmbientalInstalacao } from './../../../model/indicador-risco-saude-ambiental-instalacao';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-instalacao-form-detail',
    templateUrl: './instalacao-form-detail.html',
    styleUrls: ['./instalacao-form.css', './../../../../assets/css/form-component.css']
} )
export class InstalacaoFormDetailComponent extends GenericFormComponent implements OnInit {
    instalacao: Instalacao;
    indicadoresRiscoAcidente: Array<IndicadorRiscoAcidente>;
    indicadoresRiscoAmbiental: Array<IndicadorRiscoAmbiental>;
    indicadoresRiscoErgonomico: Array<IndicadorRiscoErgonomico>;
    indicadoresRiscoSanitario: Array<IndicadorRiscoSanitario>;
    indicadoresRiscoSaudeAmbiental: Array<IndicadorRiscoSaudeAmbiental>;
    
    instalacaoFilter: InstalacaoFilter = new InstalacaoFilter();
    
    constructor( private route: ActivatedRoute,
        private instalacaoService: InstalacaoService, 
        router: Router) { 
        super(instalacaoService, router);
        this.goTo = "instalacao";
        
        this.instalacao = new InstalacaoBuilder().initialize(this.instalacao);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.instalacaoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.instalacao = new InstalacaoBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            
            } );
            
      this.instalacaoService.getIndicadoresRiscoAcidente()
          .then(res => {
              this.indicadoresRiscoAcidente = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.instalacaoService.getIndicadoresRiscoAmbiental()
          .then(res => {
              this.indicadoresRiscoAmbiental = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.instalacaoService.getIndicadoresRiscoErgonomico()
          .then(res => {
              this.indicadoresRiscoErgonomico = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.instalacaoService.getIndicadoresRiscoSanitario()
          .then(res => {
              this.indicadoresRiscoSanitario = res.json();
          })
          .catch(error => {
              console.log(error);
          }) 
      
      this.instalacaoService.getIndicadoresRiscoSaudeAmbiental()
          .then(res => {
              this.indicadoresRiscoSaudeAmbiental = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
