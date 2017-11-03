import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker'; 

import { GlobalVariable } from './../../../global'; 
import { Empregado } from './../../../model/empregado';
import { EmpregadoService } from './../empregado.service';
import { EmpregadoFilter } from './../empregado.filter';
import { Cargo } from './../../../model/cargo';
import { Funcao } from './../../../model/funcao';
import { Regime } from './../../../model/regime';
import { Gerencia } from './../../../model/gerencia';
import { Base } from './../../../model/base';
import { Ghe } from './../../../model/ghe';
import { Ghee } from './../../../model/ghee';
import { Instalacao } from './../../../model/instalacao';
import { Telefone } from './../../../model/telefone';
import { Vacina } from './../../../model/vacina';
import { EmpregadoVacina } from './../../../model/empregado-vacina';
import { GrupoMonitoramento } from './../../../model/grupo-monitoramento';
import { HistoricoGrupoMonitoramento } from './../../../model/historico-grupo-monitoramento';
import { GenericFormComponent } from './../../../generics/generic.form.component'; 
import { EmpregadoBuilder } from './../empregado.builder';
import { GrupoMonitoramentoBuilder } from './../../grupo-monitoramento/grupo-monitoramento.builder';
import { HistoricoGrupoMonitoramentoBuilder } from './../../historico-grupo-monitoramento/historico-grupo-monitoramento.builder';

@Component( {
    selector: 'app-empregado-form',
    templateUrl: './empregado-form.html',
    styleUrls: ['./empregado-form.css']
} )
export class EmpregadoFormComponent extends GenericFormComponent implements OnInit {
    empregado: Empregado;
    statuses: Array<string>;
    sexos: Array<string>;
    cargos: Array<Cargo>;
    funcoes: Array<Funcao>;
    regimes: Array<Regime>;
    gerencias: Array<Gerencia>;
    bases: Array<Base>;
    ghes: Array<Ghe>;
    ghees: Array<Ghee>;
    vacinas: Array<Vacina>;
    instalacoes: Array<Instalacao>;
    gruposMonitoramento: Array<GrupoMonitoramento>;
    historicoGrupoMonitoramentos: Array<HistoricoGrupoMonitoramento>;

    //ngModel
    dataNascimento: any;
    dataVacinas: Array<any> = new Array<any>();
    proximaDoseVacinas: Array<any> = new Array<any>();
    dataRemocaoHistoricos: Array<any> = new Array<any>();
    
    empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
    
    constructor( private route: ActivatedRoute,
        private empregadoService: EmpregadoService) {
        super(empregadoService);
        this.goTo = "empregado";
        
        this.empregado = new EmpregadoBuilder().initialize(this.empregado);
    }

    ngOnInit() {
        this.historicoGrupoMonitoramentos = new HistoricoGrupoMonitoramentoBuilder().initializeList(
                Array<HistoricoGrupoMonitoramento>());
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    
                    this.empregadoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.empregado = new EmpregadoBuilder().clone(res.json());
                            this.verifyAndSetSelectsStrings();
                            this.parseAndSetDates();
                            this.verifyAndSetDatasRemocaoHistorico();
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
            
      this.empregadoService.getStatuses()
          .then(res => {
              this.statuses = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getSexos()
          .then(res => {
              this.sexos = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getCargos()
          .then(res => {
              this.cargos = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getFuncoes()
          .then(res => {
              this.funcoes = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getRegimes()
          .then(res => {
              this.regimes = res.json();
          })
          .catch(error => {
              console.log(error);
          }) 
      
      this.empregadoService.getGerencias()
          .then(res => {
              this.gerencias = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getBases()
          .then(res => {
              this.bases = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getGhes()
          .then(res => {
              this.ghes = res.json();
          })
          .catch(error => {
              console.log(error);
          })
  
      this.empregadoService.getGhees()
          .then(res => {
              this.ghees = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getVacinas()
          .then(res => {
              this.vacinas = res.json();
          })
          .catch(error => {
              console.log(error);
          })
    
      this.empregadoService.getInstalacoes()
          .then(res => {
              this.instalacoes = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.empregadoService.getGruposMonitoramento()
          .then(res => {
              this.gruposMonitoramento = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
        
    save() {
        this.verifyAndSetDates();
        super.save(new EmpregadoBuilder().clone(this.empregado));
    }
    
    addGrupoMonitoramento(valor: number) {
        let grupoMonitoramento = this.gruposMonitoramento.find(o => o["id"] == valor);
        this.empregado.getGrupoMonitoramentos().push(new GrupoMonitoramentoBuilder().clone(grupoMonitoramento));
    }
    
    removeGrupoMonitoramento(i: number) {
        this.empregado.getGrupoMonitoramentos().splice(i, 1);
    }

    addEmpregadoVacina() {
        if ( this.empregado.getEmpregadoVacinas() === undefined ) {
            this.empregado.setEmpregadoVacinas(new Array<EmpregadoVacina>());   
        }

        let eV: EmpregadoVacina = new EmpregadoVacina();
        eV.setVacina(new Vacina());
        
        this.empregado.getEmpregadoVacinas().push(eV);
  }
    

    removeEmpregadoVacina(i: number) {
        this.empregado.getEmpregadoVacinas().splice(i, 1);
    }
    
    addTelefone() {
        if ( this.empregado.getTelefones() === undefined ) {
            this.empregado.setTelefones(new Array<Telefone>());   
        }
        this.empregado.getTelefones().push(new Telefone());
    }

    removeTelefone(i: number) {
        this.empregado.getTelefones().splice(i, 1);
    }
    
    addInstalacao() {
        if ( this.empregado.getInstalacoes() === undefined ) {
            this.empregado.setInstalacoes(new Array<Instalacao>());
        }
        
        this.empregado.getInstalacoes().push(new Instalacao());
    }
    
    removeInstalacao(i: number) {
        this.empregado.getInstalacoes().splice(i, 1);
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
    verifyAndSetDates() {
        if (this.dataNascimento !== null && 
                this.dataNascimento !== undefined)
            this.empregado.setDataNascimento(
                    this.parseDatePickerToDate(this.dataNascimento));
            
        if ( this.empregado.getEmpregadoVacinas() !== undefined &&
                this.empregado.getEmpregadoVacinas() !== null ) {
            for (let i=0; i < this.empregado.getEmpregadoVacinas().length; i++) {
                this.empregado.getEmpregadoVacinas()[i].setData(
                        this.parseDatePickerToDate( this.dataVacinas[i]) ); 
                this.empregado.getEmpregadoVacinas()[i].setProximaDose(
                        this.parseDatePickerToDate( this.proximaDoseVacinas[i] ));
            }
        }
        
    }
    
    parseAndSetDates() {
        if (this.empregado.getDataNascimento() !== null && 
                this.empregado.getDataNascimento() !== undefined) {
            this.dataNascimento = this.parseDataToObjectDatePicker(this.empregado.getDataNascimento());
        }
        
        if ( this.empregado.getEmpregadoVacinas() !== undefined &&
                this.empregado.getEmpregadoVacinas() !== null ) {
            for (let i=0; i < this.empregado.getEmpregadoVacinas().length; i++) {
                this.dataVacinas[i] = 
                    this.parseDataToObjectDatePicker(
                            this.empregado.getEmpregadoVacinas()[i].getData()); 
                this.proximaDoseVacinas[i] = 
                    this.parseDataToObjectDatePicker(
                            this.empregado.getEmpregadoVacinas()[i].getProximaDose());
            }
        }
        
    }
    
    verifyAndSetSelectsStrings() {
        if ( this.empregado.getSexo() == undefined || 
                this.empregado.getSexo() == null )
            this.empregado.setSexo("");  
        
        if ( this.empregado.getStatus() == undefined || 
                this.empregado.getStatus() == null )
            this.empregado.setStatus("");
    }
    
    verifyAndSetDatasRemocaoHistorico() {
        if ( this.empregado.getHistoricoGrupoMonitoramentos() !== undefined &&
                this.empregado.getHistoricoGrupoMonitoramentos() !== null ) {
            for (let i=0; i < this.empregado.getHistoricoGrupoMonitoramentos().length; i++) {
                this.dataRemocaoHistoricos[i] = 
                    this.parseDataToString(
                            this.empregado.getHistoricoGrupoMonitoramentos()[i].getDataRemocao());
            }
        }
    }
}
