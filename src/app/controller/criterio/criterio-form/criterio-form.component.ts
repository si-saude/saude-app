import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Criterio } from './../../../model/criterio';
import { Cargo } from './../../../model/cargo';
import { Enfase } from './../../../model/enfase';
import { Periodicidade } from './../../../model/periodicidade';
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
    cargos: Array<Cargo>;
    enfases: Array<Enfase>;
    periodicidades: Array<Periodicidade>;
    sexos: Array<string>;
    operadores: Array<string>;
    
    selectedIdadeOrExame: boolean;
    selectedCargo: boolean;
    selectedEnfase: boolean;
    selectedPeriodicidade: boolean;
    selectedSexo: boolean;
    selectedRelatorioMedico: boolean;
    
    constructor( private route: ActivatedRoute,
        private criterioService: CriterioService,
        router: Router) { 
        super(criterioService, router);
        this.goTo = "criterio";
        
        this.enfases = new Array<Enfase>();
        this.tipos = new Array<string>();
        this.periodicidades = new Array<Periodicidade>();
        this.sexos = new Array<string>();
        this.operadores = new Array<string>();
        
        this.selectedEnfase = false;
        this.selectedCargo = false;
        this.selectedIdadeOrExame = false;
        this.selectedPeriodicidade = false;
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
      
      this.criterioService.getEnfases()
          .then(res => {
              this.enfases = res.json();
          })
          .catch(error => {
              console.log(error);
          })
      
      this.criterioService.getPeriodicidades()
          .then(res => {
              this.periodicidades = res.json();
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
        this.selectedCargo = false;
        this.selectedEnfase = false;
        this.selectedPeriodicidade = false;
        this.selectedSexo = false;
        this.selectedRelatorioMedico = false;
        
        let tipo = this.criterio.getTipo();
        
        if ( tipo.includes("NFASE") )
            tipo = "ENFASE"
        if ( tipo.includes("EXIGE RELAT"))
            tipo = "EXIGE RELATORIO MEDICO"
            
        switch( tipo ) {
        case "IDADE":
            this.selectedIdadeOrExame = true;
            break;
        case "EXAME":
            this.selectedIdadeOrExame = true;
            break;
        case "CARGO":
            this.selectedCargo = true;
            break;
        case "ENFASE":
            this.selectedEnfase = true;
            break;
        case "PERIODICIDADE":
            this.selectedPeriodicidade = true;
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
