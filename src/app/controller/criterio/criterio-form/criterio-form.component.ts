import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    styleUrls: ['./criterio-form.css']
} )
export class CriterioFormComponent extends GenericFormComponent implements OnInit {
    criterio: Criterio;
    tipos: Array<string>;
    funcoes: Array<Funcao>;
    cargos: Array<Cargo>;
    sexos: Array<string>;
    selectedIdadeOrExame: boolean;
    selectedFuncao: boolean;
    selectedCargo: boolean;
    selectedSexo: boolean;
    
    criterioFilter: CriterioFilter = new CriterioFilter();
    
    constructor( private route: ActivatedRoute,
        private criterioService: CriterioService) { 
        super(criterioService);
        this.goTo = "criterio";
        
        this.cargos = new Array<Cargo>();
        this.funcoes = new Array<Funcao>();
        this.sexos = new Array<string>();
        this.selectedFuncao = false;
        this.selectedIdadeOrExame = false;
        this.selectedCargo = false;
        this.selectedSexo = false;
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
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
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
        switch( this.criterio.getTipo() ) {
        case "IDADE":
            this.selectedIdadeOrExame = true;
            this.selectedFuncao = false;
            this.selectedCargo = false;
            this.selectedSexo = false;
            break;
        case "EXAME":
            this.selectedIdadeOrExame = true;
            this.selectedFuncao = false;
            this.selectedCargo = false;
            this.selectedSexo = false;
            break;
        case "FUNÇÃO":
            this.selectedIdadeOrExame = false;
            this.selectedFuncao = true;
            this.selectedCargo = false;
            this.selectedSexo = false;
            break;
        case "CARGO":
            this.selectedIdadeOrExame = false;
            this.selectedFuncao = false;
            this.selectedCargo = true;
            this.selectedSexo = false;
            break;
        case "SEXO":
            this.selectedIdadeOrExame = false;
            this.selectedFuncao = false;
            this.selectedCargo = false;
            this.selectedSexo = true;
            break;
        }
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
