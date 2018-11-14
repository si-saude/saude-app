import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Recordatorio } from './../../../model/recordatorio';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RecordatorioBuilder } from './../recordatorio.builder';
import { RecordatorioService } from './../recordatorio.service';
import { Refeicao } from './../../../model/refeicao';
import { RefeicaoBuilder} from './../../refeicao/refeicao.builder';
import { ItemRefeicao } from './../../../model/item-refeicao';
import { ItemRefeicaoBuilder} from './../../item-refeicao/item-refeicao.builder';
import { NutricaoAlimentoNomeAutocomplete } from './../../nutricao-alimento/nutricao-alimento-nome.autocomplete';
import { MedidaAlimentarDescricaoAutocomplete } from './../../medida-alimentar/medida-alimentar-descricao.autocomplete';
import { RecordatorioRefeicaoComponent } from './../../../includes/recordatorio-refeicao/recordatorio-refeicao.component';

import { NutricaoAlimentoBuilder } from './../../nutricao-alimento/nutricao-alimento.builder';
import { MedidaAlimentarBuilder } from './../../medida-alimentar/medida-alimentar.builder';
import { NutricaoAlimento } from './../../../model/nutricao-alimento';

@Component( {
    selector: 'app-recordatorio-form',
    templateUrl: './recordatorio-form.html',
    styleUrls: ['./recordatorio-form.css', './../../../../assets/css/form-component.css']
} )
export class RecordatorioFormComponent extends GenericFormComponent implements OnInit {
    private recordatorio: Recordatorio;
    private refeicao: Refeicao;
    private itemNew: ItemRefeicao;
    private itemEdit: ItemRefeicao;
    private alimentoAutocompleteNew;
    private alimentoAutocompleteEdit;
    private medidaAlimentarNew;
    private medidaAlimentarEdit;
    private editRefeicao: boolean;
    private editItem: boolean;
    @ViewChild( RecordatorioRefeicaoComponent ) modalRefeicao: RecordatorioRefeicaoComponent;

    constructor( private route: ActivatedRoute,
        private recordatorioService: RecordatorioService,
        router: Router) {
        super( recordatorioService, router );
        
        this.goTo = "recordatorio";
        this.recordatorio = new RecordatorioBuilder().initialize( this.recordatorio );
        this.refeicao = new RefeicaoBuilder().initialize( this.refeicao );
        this.itemEdit = new ItemRefeicaoBuilder().initialize( this.itemEdit );
        this.itemNew = new ItemRefeicaoBuilder().initialize( this.itemNew );
        this.alimentoAutocompleteNew = new NutricaoAlimentoNomeAutocomplete(recordatorioService.getNutricaoAlimentoService());
        this.alimentoAutocompleteEdit = new NutricaoAlimentoNomeAutocomplete(recordatorioService.getNutricaoAlimentoService());
        this.medidaAlimentarNew = new MedidaAlimentarDescricaoAutocomplete(recordatorioService.getMedidaAlimentarService());
        this.medidaAlimentarEdit = new MedidaAlimentarDescricaoAutocomplete(recordatorioService.getMedidaAlimentarService());
        this.modalRefeicao = new RecordatorioRefeicaoComponent();
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
                            let idAtendimento = res.json()['atendimento']['id'];
                            this.recordatorio = new RecordatorioBuilder().clone( res.json() );
                            this.recordatorio.getAtendimento().setId(idAtendimento);
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else if ( params['atendimento_id'] !== undefined ) {
                    let id = params['atendimento_id'];
                    this.showPreload = true;
                    this.showPreload = false;
                    this.recordatorio = new RecordatorioBuilder().initialize( null );
                    this.recordatorio.getAtendimento().setId(id);
                }
            } );    
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        let idAtendimento = this.recordatorio.getAtendimento().getId();
        this.recordatorio = new RecordatorioBuilder().clone( this.recordatorio );
        this.recordatorio.getAtendimento().setId(idAtendimento);
        super.save( this.recordatorio );
    }
    
    selectRefeicao(ref: Refeicao, r: number) {
        this.refeicao = ref;
        this.editRefeicao = true;
        for(let i=0; i<this.recordatorio.getRefeicoes().length;i++)
            $("."+i).css("background-color", "#fff");
        $("."+r).css("background-color", "#4ff7f1");
    }
    
    selectItemRefeicao(it: ItemRefeicao) {
        this.itemEdit = it;
        this.editItem = true;
    }
    
    removeRefeicao(r) {
        this.recordatorio.getRefeicoes().splice(r, 1);
        this.editRefeicao = false;
    }
    
    removeItemRefeicao(i) {
        this.refeicao.getItens().splice(i, 1);
        this.editItem = false;
    }
    
    addItemRefeicao() {
        if ( this.itemNew.getAlimento() == undefined ||
                this.itemNew.getAlimento().getId() == undefined ||
                this.itemNew.getAlimento().getId() <= 0 ||
                this.itemNew.getMedidaCaseira() == undefined ||
                this.itemNew.getMedidaCaseira().getId() == undefined ||
                this.itemNew.getMedidaCaseira().getId() <= 0 ) {
            this.callToast("Por favor, preencha todos os campos corretamente.", 4000)
            return;
        }
        this.refeicao.getItens().push(new ItemRefeicaoBuilder().clone(this.itemNew));
        this.itemNew = new ItemRefeicaoBuilder().initialize(null);
    }
    
    callAddRefeicao() {
        this.modalRefeicao.openModalRefeicao();
    }
    
    addRefeicao(refeicao: Refeicao) {
        this.recordatorio.getRefeicoes().push(refeicao);
    }
        
    sumVe(r: number) {
        let sum = 0;
        this.recordatorio.getRefeicoes()[r].getItens().forEach(i => {
            sum += i.getVe();
        })
        return sum;
    }
    
    sumNe(r: number) {
        let sum = 0;
        this.recordatorio.getRefeicoes()[r].getItens().forEach(i => {
            sum += i.getNe();
        })
        return sum;
    }
}