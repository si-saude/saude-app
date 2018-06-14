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
import { GheBuilder } from './../../ghe/ghe.builder';
import { AprhoService } from './../aprho.service';
import { PossivelDanoSaudeBuilder } from './../../possivel-dano-saude/possivel-dano-saude.builder';
import { AgenteRiscoBuilder } from './../../agente-risco/agente-risco.builder';
import { FonteGeradoraBuilder } from './../../fonte-geradora/fonte-geradora.builder';
import { CategoriaRiscoBuilder } from './../../categoria-risco/categoria-risco.builder';


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
    private flagIdGhe : number;
    private arrayGhe: Array<Ghe>;
    private modalGhe;
    private value;
    private filter;
    private typeFilter;
    private meioPropagacoes: Array<string>;
    private medidaControles: Array<string>;
    private categoriaRiscos: Array<CategoriaRisco>;
    private modalPossivelDanoSaude;
    private arrayPossivelDanoSaude: Array<PossivelDanoSaude>;
    private modalAgenteRisco;
    private arrayAgenteRisco: Array<AgenteRisco>;
    private modalFonteGeradora;
    private arrayFonteGeradora: Array<FonteGeradora>;
    private activeAgenteRisco:boolean;
    private activePossivelDanoSaude:boolean;
    private activeFonteGeradora:boolean;
    private activeGhe:boolean;
    
    
    constructor( private route: ActivatedRoute,
        private aprhoService: AprhoService,     
        router: Router) {
        super( aprhoService, router );

        this.goTo = "aprho";
        this.modalGhe = new EventEmitter<string | MaterializeAction>();
        this.aprho = new AprhoBuilder().initialize( this.aprho );
        this.aprhoItem = new AprhoItemBuilder().initialize( this.aprhoItem );
        this.filter = "";
        this.meioPropagacoes = new Array<string>();
        this.medidaControles = new Array<string>();
        this.modalPossivelDanoSaude = new EventEmitter<string | MaterializeAction>();
        this.arrayPossivelDanoSaude = new Array<PossivelDanoSaude>();
        this.modalAgenteRisco = new EventEmitter<string | MaterializeAction>();
        this.arrayAgenteRisco = new Array<AgenteRisco>();
        this.modalFonteGeradora = new EventEmitter<string | MaterializeAction>();
        this.arrayFonteGeradora = new Array<FonteGeradora>();
        this.activeAgenteRisco = false;
        this.activePossivelDanoSaude = false;
        this.activeFonteGeradora = false;
        this.activeGhe = false;
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
                            this.parseAndSetDates();
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
    
     removeAprho(i: number) {
        this.aprho.getAprhoItens().splice(i, 1);
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
                this.verifyAndSetDates();
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
    
    verifyAndSetDates() {
        if ( this.data !== null &&
            this.data !== undefined )
            this.aprho.setData(
                this.parseDatePickerToDate( this.data ) );
    }
    
    parseAndSetDates() {
        if ( this.aprho.getData() !== null &&
            this.aprho.getData() !== undefined ) {
            this.data = this.parseDataToObjectDatePicker( this.aprho.getData() );
        }
    }
    
    openModalFonteGeradora() {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-fonte-geradora-descricao']").val('');
        this.activeAgenteRisco = false;
        this.activePossivelDanoSaude = false;
        this.activeGhe = false;
        this.activeFonteGeradora = true;
        this.fetchFonteGeradora();
        this.modalFonteGeradora.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchFonteGeradora() {
        this.aprhoService.getFonteGeradoras()
            .then(res => {
                this.arrayFonteGeradora = new FonteGeradoraBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o possivel Fonte Geradora por descricao");
            })
    }
    
    selectFonteGeradora( fonteGeradora: FonteGeradora) {       
       this.aprhoItem.setFonteGeradora(fonteGeradora);
       this.modalFonteGeradora.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalFonteGeradora() {
        this.modalFonteGeradora.emit( { action: "modal", params: ['close'] } );
    }
    
    
    
    
    openModalAgenteRisco() {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-agente-risco-descricao']").val('');
        this.activeAgenteRisco = true;
        this.activePossivelDanoSaude = false;
        this.activeFonteGeradora = false;
        this.activeGhe = false;
        this.fetchAgenteRisco();
        this.modalAgenteRisco.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchAgenteRisco() {
        this.aprhoService.getAgenteRiscos()
            .then(res => {
                this.arrayAgenteRisco = new AgenteRiscoBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o agente de risco por descricao");
            })
    }
    
    selectAgenteRisco( agenteRisco: AgenteRisco) {       
       this.aprhoItem.setAgenteRisco(agenteRisco)
       this.modalAgenteRisco.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalAgenteRisco() {
        this.modalAgenteRisco.emit( { action: "modal", params: ['close'] } );
    }
    
    openModalPossivelDanoSaude() {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-possivel-dano-saude-descricao']").val('');
        this.activeAgenteRisco = false;
        this.activeFonteGeradora = false;
        this.activeGhe = false;
        this.activePossivelDanoSaude = true;
        this.fetchPossivelDanoSaude()
        this.modalPossivelDanoSaude.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchPossivelDanoSaude() {
        this.aprhoService.getPossivelDanoSaudes()
            .then(res => {
                this.arrayPossivelDanoSaude = new PossivelDanoSaudeBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o possivel dano à saúde por descricao");
            })
    }
    
    selectPossivelDanoSaude( possivelDanoSaude: PossivelDanoSaude) {
       this.aprhoItem.setPossivelDanoSaude(possivelDanoSaude);
       this.modalPossivelDanoSaude.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalPossivelDanoSaude() {
        this.modalPossivelDanoSaude.emit( { action: "modal", params: ['close'] } );
    }
        
    openModalGhe() {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-ghe-descricao']").val('');
        this.activeAgenteRisco = false;
        this.activeFonteGeradora = false;
        this.activePossivelDanoSaude = false;
        this.activeGhe = true;
        this.fetchGhe()
        this.modalGhe.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchGhe() {
        
        this.aprhoService.getGhesAtivos()
            .then(res => {
                this.arrayGhe = new GheBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o GHE por nome");
            })
    }
    
    selectGhe( ghe: Ghe ) {
        this.aprho.setGhe(ghe);
        this.modalGhe.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalGhe() {
        this.modalGhe.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, type: string ) {
        let splitType = type.split('-');   
        this.filter = event;
        this.typeFilter = splitType[2];
        this.value = $('input[name='+type).val();
    }

}