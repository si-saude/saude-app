import { Component, OnInit, ViewChild, EventEmitter,ViewEncapsulation, ElementRef} from '@angular/core';
import { NgForm } from "@angular/forms";


import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeDirective} from "angular2-materialize";
import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { PossivelDanoSaude } from './../../../model/possivel-dano-saude';
import { Ghe } from './../../../model/ghe';
import { CategoriaRisco } from './../../../model/categoria-risco';
import { AgenteRisco } from './../../../model/agente-risco';
import { FonteGeradora } from './../../../model/fonte-geradora';
import { GlobalVariable } from './../../../global';
import { Aprho } from './../../../model/aprho';
import { AprhoItem } from './../../../model/aprho-item';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AprhoBuilder } from './../aprho.builder';
import { AprhoItemBuilder } from './../../aprho-item/aprho-item.builder';
import { AprhoEmpregado } from './../../../model/aprho-empregado';
import { AprhoEmpregadoBuilder } from './../../aprho-empregado/aprho-empregado.builder';
import { GheBuilder } from './../../ghe/ghe.builder';
import { AprhoService } from './../aprho.service';
import { PossivelDanoSaudeBuilder } from './../../possivel-dano-saude/possivel-dano-saude.builder';
import { AgenteRiscoBuilder } from './../../agente-risco/agente-risco.builder';
import { FonteGeradoraBuilder } from './../../fonte-geradora/fonte-geradora.builder';
import { CategoriaRiscoBuilder } from './../../categoria-risco/categoria-risco.builder';
import { GheNomeAutocomplete } from './../../ghe/ghe-nome.autocomplete';
import { AgenteRiscoDescricaoAutocomplete } from './../../agente-risco/agente-risco-descricao.autocomplete';
import { FonteGeradoraDescricaoAutocomplete } from './../../fonte-geradora/fonte-geradora-descricao.autocomplete';
import { PossivelDanoSaudeDescricaoAutocomplete } from './../../possivel-dano-saude/possivel-dano-saude-descricao.autocomplete';
import { EmpregadoNomeAutocomplete } from './../../empregado/empregado-nome.autocomplete';

@Component( {
    selector: 'app-aprho-form',
    templateUrl: './aprho-form.html',   
    styleUrls: ['./aprho-form.css','./../../../../assets/css/modal-filter.css','./../../../../assets/css/form-component.css']
} )
export class AprhoFormComponent extends GenericFormComponent implements OnInit {
    @ViewChild( 'form3' ) formulario: NgForm;
    @ViewChild( 'form' ) formulario2: NgForm;
    private aprho: Aprho;
    private data: any;
    private aprhoItem: AprhoItem;
    private aprhoEmpregado: AprhoEmpregado;
    private flagIdGhe : number;
    private arrayGhe: Array<Ghe>;
    private modalGhe;
    private value;
    private filter;
    private typeFilter;
    private categoriaRiscos: Array<CategoriaRisco>;
    private meioPropagacoes: Array<string>;
    private medidaControles: Array<string>;   
    private autoCompleteGhe:GheNomeAutocomplete;
    private autoCompleteAgenteRisco:AgenteRiscoDescricaoAutocomplete;
    private autoCompleteFonteGeradora:FonteGeradoraDescricaoAutocomplete;
    private autoCompletePossivelDanoSaude:PossivelDanoSaudeDescricaoAutocomplete;
    private autoCompleteEmpregado:EmpregadoNomeAutocomplete;
    
    
    constructor( private route: ActivatedRoute,
        private aprhoService: AprhoService,     
        router: Router) {
        super( aprhoService, router );

        this.goTo = "aprho";
        this.modalGhe = new EventEmitter<string | MaterializeAction>();
        this.aprho = new AprhoBuilder().initialize( this.aprho );
        this.aprhoItem = new AprhoItemBuilder().initialize( this.aprhoItem );
        this.aprhoEmpregado = new AprhoEmpregadoBuilder().initialize( this.aprhoEmpregado );
        this.filter = "";
        this.meioPropagacoes = new Array<string>();
        this.medidaControles = new Array<string>();
        this.autoCompleteGhe = new GheNomeAutocomplete(this.aprhoService.getGheService());
        this.autoCompleteAgenteRisco = new AgenteRiscoDescricaoAutocomplete(this.aprhoService.getAgenteRiscoService());
        this.autoCompleteFonteGeradora = new FonteGeradoraDescricaoAutocomplete(this.aprhoService.getFonteGeradoraService());
        this.autoCompletePossivelDanoSaude = new PossivelDanoSaudeDescricaoAutocomplete(this.aprhoService.getPossivelDanoSaudeService());
        this.autoCompleteEmpregado = new EmpregadoNomeAutocomplete(this.aprhoService.getEmpregadoService());
     }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {                
                
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.aprho = new AprhoBuilder().clone( res.json() );
                            this.autoCompleteGhe.getAutocomplete().initializeLastValue(this.aprho.getGhe().getNome());         
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        this.getMeioPropagacoes();
        this.getMedidaControles();
        this.getCategoriaRiscos();
    } 
    
    addAprhoItem() {     
        this.aprhoItem.setCategoriaRisco(this.categoriaRiscos.find(c => c.getId() == this.aprhoItem.getCategoriaRisco().getId()));            
        this.aprho.getAprhoItens().push(new AprhoItemBuilder().clone(this.aprhoItem));
    }
    
    addAprhoEmpregado() {  
       if(this.aprho.getAprhoEmpregados().find( c => c.getEmpregado().getId() === this.aprhoEmpregado.getEmpregado().getId())==undefined)
           this.aprho.getAprhoEmpregados().push(new AprhoEmpregadoBuilder().clone(this.aprhoEmpregado));
       else{
           this.toastParams = ['Empregado adicionado anteriormente', 4000];
           this.globalActions.emit( 'toast' );
       } 
    }
    
     removeAprho(i: number) {
        this.aprho.getAprhoItens().splice(i, 1);
    }
     
     removeAprhoEmpregado(i: number) {
         this.aprho.getAprhoEmpregados().splice(i, 1);
     }
     
    getMedidaControles() {
        this.aprhoService.getMedidaControles()
            .then(res => {
                this.medidaControles = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar medida de controle.");
            })
    }
    
    
    getMeioPropagacoes() {
        this.aprhoService.getMeioPropagacoes()
            .then(res => {
                this.meioPropagacoes = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar meio de propagacao.");
            })
    }
    
    getCategoriaRiscos() {
        this.aprhoService.getCategoriaRiscos()
            .then(res => {
                this.categoriaRiscos = new CategoriaRiscoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao retornar categoria de risco.");
            })
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() { 
        if(this.formulario.valid){
            if(this.aprho.getAprhoItens().length > 0){
                super.save(new AprhoBuilder().clone( this.aprho ));
                
            }else{
                
                this.toastParams = ["Por favor, adicione pelo menos um Agente de Risco na lista", 4000];
                this.globalActions.emit('toast');            
            }
        }else
          {
            this.toastParams = ["Por favor, Preencha todos os campos", 4000];
            this.globalActions.emit('toast');   
          }
    }
}