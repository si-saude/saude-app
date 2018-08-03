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
import { Profissional } from './../../../model/profissional';
import { ProfissionalSaudeBuilder } from './../../profissional-saude/profissional-saude.builder';
import { AprhoItem } from './../../../model/aprho-item';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AprhoBuilder } from './../aprho.builder';
import { AprhoItemBuilder } from './../../aprho-item/aprho-item.builder';
import { AprhoEmpregado } from './../../../model/aprho-empregado';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
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
import { ProfissionalNomeAutocomplete } from './../../../controller/profissional-saude/profissional-nome.autocomplete';

@Component( {
    selector: 'app-aprho-form',
    templateUrl: './aprho-form.html',   
    styleUrls: ['./aprho-form.css','./../../../../assets/css/modal-filter.css','./../../../../assets/css/form-component.css']
} )
export class AprhoFormComponent extends GenericFormComponent implements OnInit {
    @ViewChild( 'form3' ) formulario: NgForm;
    @ViewChild( 'form' ) formulario2: NgForm;
    private aprho: Aprho;
    private aprhoItem: AprhoItem;
    private aprhoEmpregado: AprhoEmpregado;
    private equipe: Equipe;
    private flagIdGhe : number;
    private arrayGhe: Array<Ghe>;
    private modalGhe;
    private value;
    private filter;
    private typeFilter;
    private categoriaRiscos: Array<CategoriaRisco>;
    private meioPropagacoes: Array<string>;
    private medidaControles: Array<string>;  
    private avaliacaoEficacias: Array<string>;   
    private autoCompleteGhe:GheNomeAutocomplete;
    private autoCompleteAgenteRisco:AgenteRiscoDescricaoAutocomplete;
    private autoCompleteFonteGeradora:FonteGeradoraDescricaoAutocomplete;
    private autoCompletePossivelDanoSaude:PossivelDanoSaudeDescricaoAutocomplete;
    private autoCompleteEmpregado:EmpregadoNomeAutocomplete;
    private autoCompleteAprovador:ProfissionalNomeAutocomplete;
    private autoCompleteElaborador:ProfissionalNomeAutocomplete;
    
    constructor( private route: ActivatedRoute,
        private aprhoService: AprhoService,     
        router: Router) {
        super( aprhoService, router );

        this.goTo = "aprho";
        this.modalGhe = new EventEmitter<string | MaterializeAction>();
        this.aprho = new AprhoBuilder().initialize( this.aprho );
        this.aprhoItem = new AprhoItemBuilder().initialize( this.aprhoItem );
        this.aprhoEmpregado = new AprhoEmpregadoBuilder().initialize( this.aprhoEmpregado );
        this.equipe = new EquipeBuilder().initialize( this.equipe );
        this.filter = "";
        this.meioPropagacoes = new Array<string>();
        this.medidaControles = new Array<string>();
        this.avaliacaoEficacias = new Array<string>();
        this.autoCompleteGhe = new GheNomeAutocomplete(this.aprhoService.getGheService());
        this.autoCompleteAgenteRisco = new AgenteRiscoDescricaoAutocomplete(this.aprhoService.getAgenteRiscoService());
        this.autoCompleteFonteGeradora = new FonteGeradoraDescricaoAutocomplete(this.aprhoService.getFonteGeradoraService());
        this.autoCompletePossivelDanoSaude = new PossivelDanoSaudeDescricaoAutocomplete(this.aprhoService.getPossivelDanoSaudeService());
        this.autoCompleteEmpregado = new EmpregadoNomeAutocomplete(this.aprhoService.getEmpregadoService());
        this.autoCompleteAprovador = new ProfissionalNomeAutocomplete(this.aprhoService.getProfissionalSaudeService());
        this.autoCompleteElaborador = new ProfissionalNomeAutocomplete(this.aprhoService.getProfissionalSaudeService());
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
                            this.autoCompleteAprovador.getAutocomplete().initializeLastValue(this.aprho.getAprovador().getEmpregado().getPessoa().getNome());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        
        this.getMeioPropagacoes();
        this.getMedidaControles();
        this.getAvaliacaoEficacias();
        this.getCategoriaRiscos();
    } 
    
    addAprhoItem() {
        
        if(this.aprhoItem.getCategoriaRisco().getId() > 0 )
            this.aprhoItem.setCategoriaRisco(this.categoriaRiscos.find(c => c.getId() == this.aprhoItem.getCategoriaRisco().getId()));            
        
       let aprhoItemAux= new AprhoItemBuilder().clone(this.aprhoItem);
           aprhoItemAux = new AprhoItemBuilder().clone(aprhoItemAux);
        this.aprho.getAprhoItens().push(aprhoItemAux);
            
    }
    
    addAprhoEmpregado() {  
       if(this.aprhoEmpregado.getEmpregado().getId() !=0){
           if(this.aprho.getAprhoEmpregados().find( c => c.getEmpregado().getId() === this.aprhoEmpregado.getEmpregado().getId())==undefined){ 
              this.aprho.getAprhoEmpregados().push(new AprhoEmpregadoBuilder().clone(new AprhoEmpregadoBuilder().clone(this.aprhoEmpregado)));
           }
           else{
               this.toastParams = ['Empregado adicionado anteriormente', 4000];
               this.globalActions.emit( 'toast' );
           } 
        }
       else{
           this.toastParams = ['Selecione um Empregado', 4000];
           this.globalActions.emit( 'toast' );
       }
    }
    
     removeAprho(i: number) {
        this.aprho.getAprhoItens().splice(i, 1);
    }
     
     addAprhoElaborador() {  
         
         if(this.equipe.getCoordenador().getId() != 0){
             
             if(this.aprho.getElaboradores().find( c => c.getId() === this.equipe.getCoordenador().getId())==undefined){
                this.aprho.getElaboradores().push(new ProfissionalSaudeBuilder().clone(new ProfissionalSaudeBuilder().clone(this.equipe.getCoordenador())));
             }
             else{
                 this.toastParams = ['Elaborador adicionado anteriormente', 4000];
                 this.globalActions.emit( 'toast' );
             } 
          }
         else{
             this.toastParams = ['Selecione um Elaborador', 4000];
             this.globalActions.emit( 'toast' );
         }
         
     }
     
     removeAprhoElaborador(i: number) {
         this.aprho.getElaboradores().splice(i, 1);
     }
     
     removeAprhoEmpregado(i: number) {
         this.aprho.getAprhoEmpregados().splice(i, 1);
     }
     
     exportFile(){     
         if(this.verificarForm()){             
             this.aprhoService.aprhoToPdf(new AprhoBuilder().clone(this.aprho))
             .then(res => {                         
                 var w= window.open('', '_blank', 'top=0,left=0,height=1px,width=1px');
                 w.document.write(res.text());
                 w.print();
                 w.close();
             })
             .catch(error => {
                 this.toastParams = [error.text(), 4000];
                 this.globalActions.emit( 'toast' );
                 console.log("Erro ao retornar o pdf."+error);
             })
         }
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
    
    getAvaliacaoEficacias() {
        this.aprhoService.getAvaliacaoEficacias()
            .then(res => {
                this.avaliacaoEficacias = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                console.log("Erro ao retornar Avaliação de Eficácias.");
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
        if(this.verificarForm()){
            super.save(new AprhoBuilder().clone( this.aprho ));
        }
    }
    
    verificarForm(){
        
        if(this.formulario.valid){
//          
          if(this.aprho.getAprhoItens().length > 0 && this.aprho.getAprhoEmpregados().length > 0 ){                
              return true;
              
          }else{
              
              this.toastParams = ["Por favor, adicione pelo menos um Agente de Risco, Empregado e Elaborador nas listas", 4000];
              this.globalActions.emit('toast');      
              return false;
          }
      }else
        {
          this.toastParams = ["Por favor, Preencha todos os campos", 4000];
          this.globalActions.emit('toast');  
          return false;
        }        
    }
}