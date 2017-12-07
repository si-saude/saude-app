import { Component, OnInit, ViewChild } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router'; 
import { NgForm } from '@angular/forms';

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

    //ngModel
    dataInspecaoAcidente: Array<any> = new Array<any>();
    dataInspecaoAmbiental: Array<any> = new Array<any>();
    dataInspecaoErgonomico: Array<any> = new Array<any>();
    dataInspecaoSanitario: Array<any> = new Array<any>();
    dataInspecaoSaudeAmbiental: Array<any> = new Array<any>();
    
    instalacaoFilter: InstalacaoFilter = new InstalacaoFilter();
    
    constructor( private route: ActivatedRoute,
        private instalacaoService: InstalacaoService) { 
        super(instalacaoService);
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
                        console.log(res.json());
                        this.parseAndSetDates();
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
    
    parseAndSetDates() {
        if ( this.instalacao.getIndicadorRiscoAcidenteInstalacoes() !== undefined &&
                this.instalacao.getIndicadorRiscoAcidenteInstalacoes() !== null ) {
            
            for (let i=0; i < this.instalacao.getIndicadorRiscoAcidenteInstalacoes().length; i++) {
                this.dataInspecaoAcidente[i] = 
                    this.parseDataToObjectDatePicker(
                            this.instalacao.getIndicadorRiscoAcidenteInstalacoes()[i].getDataInspecao());   
            }
        }
        
        if ( this.instalacao.getIndicadorRiscoAmbientalInstalacoes() !== undefined &&
                this.instalacao.getIndicadorRiscoAmbientalInstalacoes() !== null ) {
            
            for (let i=0; i < this.instalacao.getIndicadorRiscoAmbientalInstalacoes().length; i++) {
                this.dataInspecaoAmbiental[i] = 
                    this.parseDataToObjectDatePicker(
                            this.instalacao.getIndicadorRiscoAmbientalInstalacoes()[i].getDataInspecao());   
            }
        }
        
        if ( this.instalacao.getIndicadorRiscoErgonomicoInstalacoes() !== undefined &&
                this.instalacao.getIndicadorRiscoErgonomicoInstalacoes() !== null ) {
            
            for (let i=0; i < this.instalacao.getIndicadorRiscoErgonomicoInstalacoes().length; i++) {
                this.dataInspecaoErgonomico[i] = 
                    this.parseDataToObjectDatePicker(
                            this.instalacao.getIndicadorRiscoErgonomicoInstalacoes()[i].getDataInspecao());   
            }
        }
        
        if ( this.instalacao.getIndicadorRiscoSanitarioInstalacoes() !== undefined &&
                this.instalacao.getIndicadorRiscoSanitarioInstalacoes() !== null ) {
            
            for (let i=0; i < this.instalacao.getIndicadorRiscoSanitarioInstalacoes().length; i++) {
                this.dataInspecaoSanitario[i] = 
                    this.parseDataToObjectDatePicker(
                            this.instalacao.getIndicadorRiscoSanitarioInstalacoes()[i].getDataInspecao());   
            }
        }
        
        if ( this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes() !== undefined &&
                this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes() !== null ) {
            
            for (let i=0; i < this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes().length; i++) {
                this.dataInspecaoSaudeAmbiental[i] = 
                    this.parseDataToObjectDatePicker(
                            this.instalacao.getIndicadorRiscoSaudeAmbientalInstalacoes()[i].getDataInspecao());   
            }
        }
        
    }
}
