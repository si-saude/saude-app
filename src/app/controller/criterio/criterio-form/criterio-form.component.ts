import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Criterio } from './../../../model/criterio';
import { Funcao } from './../../../model/funcao';
import { Cargo } from './../../../model/cargo';
import { CriterioService } from './../criterio.service';
import { CriterioFilter } from './../criterio.filter';
import { CriterioBuilder } from './../criterio.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-criterio-form',
    templateUrl: './criterio-form.html',
    styleUrls: ['./criterio-form.css', './../../../../assets/css/form-component.css']
} )
export class CriterioFormComponent extends GenericFormComponent implements OnInit {
    criterio: Criterio;
    tipos: Array<string>;
    funcoes: Array<Funcao>;
    cargos: Array<Cargo>;
    sexos: Array<string>;
    operadores: Array<string>;
    selectedIdadeOrExame: boolean;
    selectedFuncao: boolean;
    selectedCargo: boolean;
    selectedSexo: boolean;
    selectedRelatorioMedico: boolean;
    
    constructor( private route: ActivatedRoute,
        private criterioService: CriterioService,
        router: Router) { 
        super(criterioService, router);
        this.goTo = "criterio";
        
        this.cargos = new Array<Cargo>();
        this.tipos = new Array<string>();
        this.funcoes = new Array<Funcao>();
        this.sexos = new Array<string>();
        this.operadores = new Array<string>();
        this.selectedFuncao = false;
        this.selectedIdadeOrExame = false;
        this.selectedCargo = false;
        this.selectedSexo = false;
        this.selectedRelatorioMedico = false;
        this.criterio = new CriterioBuilder().initialize(this.criterio);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.criterioService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.criterio = new CriterioBuilder().clone(res.json());
                            this.selectTipo();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
            
      this.criterioService.getTipos()
          .then(res => {
              this.tipos = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.criterioService.getSexos()
          .then(res => {
              this.sexos = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.criterioService.getOperadores() 
          .then(res => {
              this.operadores = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.criterioService.getCargos()
          .then(res => {
              this.cargos = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.criterioService.getFuncoes()
          .then(res => {
              this.funcoes = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    
    save() {
        super.save(new CriterioBuilder().clone(this.criterio));
    }   
    
    selectTipo() {
        this.selectedIdadeOrExame = false;
        this.selectedFuncao = false;
        this.selectedCargo = false;
        this.selectedSexo = false;
        this.selectedRelatorioMedico = false;
        
        let tipo = this.criterio.getTipo();
        
        if ( tipo.includes("FUN") )
            tipo = "FUNCAO"
        if ( tipo.includes("EXIGE RELAT"))
            tipo = "EXIGE RELATORIO MEDICO"
            
        switch( tipo ) {
        case "IDADE":
            this.selectedIdadeOrExame = true;
            break;
        case "EXAME":
            this.selectedIdadeOrExame = true;
            break;
        case "FUNCAO":
            this.selectedFuncao = true;
            break;
        case "CARGO":
            this.selectedCargo = true;
            break;
        case "SEXO":
            this.selectedSexo = true;
            break;
        case "EXIGE RELATORIO MEDICO":
            this.selectedRelatorioMedico = true;
            break;
        }
        
        
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
