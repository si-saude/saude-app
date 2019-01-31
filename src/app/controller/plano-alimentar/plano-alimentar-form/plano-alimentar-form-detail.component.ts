import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { PlanoAlimentar } from './../../../model/plano-alimentar';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { PlanoAlimentarBuilder } from './../plano-alimentar.builder';
import { PlanoAlimentarService } from './../plano-alimentar.service';
import { RefeicaoPlano } from './../../../model/refeicao-plano';
import { RefeicaoPlanoBuilder} from './../../refeicao-plano/refeicao-plano.builder';
import { ItemRefeicaoPlano } from './../../../model/item-refeicao-plano';
import { ItemRefeicaoPlanoBuilder} from './../../item-refeicao-plano/item-refeicao-plano.builder';
import { AlimentoNomeAutocomplete } from './../../alimento/alimento-nome.autocomplete';
import { MedidaAlimentarDescricaoAutocomplete } from './../../medida-alimentar/medida-alimentar-descricao.autocomplete';
import { PlanoAlimentarRefeicaoComponent } from './../../../includes/refeicao-plano/refeicao-plano.component';
import { ItemRefeicaoPlanoComponent } from './../../../includes/item-refeicao-plano/item-refeicao-plano.component';

import { AlimentoBuilder } from './../../alimento/alimento.builder';
import { MedidaAlimentarBuilder } from './../../medida-alimentar/medida-alimentar.builder';
import { Alimento } from './../../../model/alimento';

@Component( {
    selector: 'app-plano-alimentar-detail-form',
    templateUrl: './plano-alimentar-form-detail.html',
    styleUrls: ['./plano-alimentar-form.css', './../../../../assets/css/form-component.css']
} )         
export class PlanoAlimentarFormDetailComponent extends GenericFormComponent implements OnInit {
    private empregado: string;
    private planoAlimentar: PlanoAlimentar;
    private refeicao: RefeicaoPlano;
    private itemNew: ItemRefeicaoPlano;
    private itemEdit: ItemRefeicaoPlano;
    private alimentoAutocompleteNew;
    private alimentoAutocompleteEdit;
    private medidaAlimentarNew;
    private medidaAlimentarEdit;
    private editRefeicao: boolean;
    private editItem: boolean;
    private somatorioVe: number = 0;
    @ViewChild( PlanoAlimentarRefeicaoComponent ) modalRefeicao: PlanoAlimentarRefeicaoComponent;
    @ViewChild( ItemRefeicaoPlanoComponent ) itemRefeicaoComponent: ItemRefeicaoPlanoComponent;

    constructor( private route: ActivatedRoute,
        private planoAlimentarService: PlanoAlimentarService,
        router: Router) {
        super( planoAlimentarService, router );
        
        this.goTo = "planoAlimentar";
        this.planoAlimentar = new PlanoAlimentarBuilder().initialize( this.planoAlimentar );
        this.refeicao = new RefeicaoPlanoBuilder().initialize( this.refeicao );
        this.itemEdit = new ItemRefeicaoPlanoBuilder().initialize( this.itemEdit );
        this.itemNew = new ItemRefeicaoPlanoBuilder().initialize( this.itemNew );
        this.alimentoAutocompleteNew = new AlimentoNomeAutocomplete(planoAlimentarService.getAlimentoService());
        this.alimentoAutocompleteEdit = new AlimentoNomeAutocomplete(planoAlimentarService.getAlimentoService());
        this.medidaAlimentarNew = new MedidaAlimentarDescricaoAutocomplete(planoAlimentarService.getMedidaAlimentarService());
        this.medidaAlimentarEdit = new MedidaAlimentarDescricaoAutocomplete(planoAlimentarService.getMedidaAlimentarService());
        this.modalRefeicao = new PlanoAlimentarRefeicaoComponent();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['empregado'] !== undefined )
                
                    this.empregado = params['empregado'];
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;
                    
                
                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            let idAtendimento = res.json()['atendimento']['id'];
                            this.planoAlimentar = new PlanoAlimentarBuilder().clone( res.json() );
                            this.planoAlimentar.getAtendimento().setId(idAtendimento);
                            
                            this.planoAlimentar.getRefeicoes().forEach(r => this.sumVe(r));
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                } else if ( params['atendimento_id'] !== undefined ) {
                    
                    let id = params['atendimento_id'];
                    this.showPreload = true;
                    this.showPreload = false;
                    this.planoAlimentar = new PlanoAlimentarBuilder().initialize( null );
                    this.planoAlimentar.getAtendimento().setId(id);
                    this.getNe();
                }
            } );
    }
    
    getNe() {
        this.planoAlimentarService.getNe(this.planoAlimentar)
            .then(res => {
                let atendimento = res.json()["atendimento"];
                this.planoAlimentar = new PlanoAlimentarBuilder().clone( res.json() );
                this.planoAlimentar.setAtendimento(atendimento);
            })
            .catch(error => {
                this.catchConfiguration( error );
            })
    }
    
    calculateSumVe() {
        this.somatorioVe = 0;
        this.planoAlimentar.getRefeicoes().forEach(r => {
            this.somatorioVe += r.getSomatorio();
        })
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        let idAtendimento = this.planoAlimentar.getAtendimento()["id"];  
        this.planoAlimentar = new PlanoAlimentarBuilder().clone( this.planoAlimentar );  
        this.planoAlimentar.getAtendimento().setId(idAtendimento);
        console.log(this.planoAlimentar)
        super.save( this.planoAlimentar );
    }
    
    selectRefeicao(ref: RefeicaoPlano, r: number) {
        this.refeicao = ref;
        this.editRefeicao = true;
        for(let i=0; i<this.planoAlimentar.getRefeicoes().length;i++)
            $("."+i).css("background-color", "#fff");
        $("."+r).css("background-color", "#d8d8d8");
    }
    
    selectItemRefeicao(it: ItemRefeicaoPlano) {
        this.itemEdit = it;
        this.editItem = true;
    }
    
    removeRefeicao(r) {
        this.planoAlimentar.getRefeicoes().splice(r, 1);
        this.editRefeicao = false;
    }
    
    addItemRefeicao() {
        if ( this.itemNew.getAlimento() == undefined ||
                this.itemNew.getAlimento().getId() == undefined ||
                this.itemNew.getAlimento().getId() <= 0 ||
                this.itemNew.getMedidaCaseira() == undefined ||
                this.itemNew.getMedidaCaseira()["id"] == undefined ||
                this.itemNew.getMedidaCaseira()["id"] <= 0 &&
                this.itemNew.getQuantidade() == undefined || 
                this.itemNew.getQuantidade() <= 0 ) {
            this.callToast("Por favor, preencha todos os campos corretamente.", 4000)
            return;
        }
        this.refeicao.getItens().push(this.itemNew);
        this.itemNew = new ItemRefeicaoPlanoBuilder().initialize(null);
        this.sumVe(this.refeicao);
        this.calculateSumVe();
    }
     
    removeItemRefeicao(i) {
        this.refeicao.getItens().splice(i, 1);
        this.editItem = false;
        this.sumVe(this.refeicao);
        this.calculateSumVe();
    }
    
    callAddRefeicao() {
        this.modalRefeicao.openModalRefeicao();
    }
    
    addRefeicao(refeicao: RefeicaoPlano) {
        this.planoAlimentar.getRefeicoes().push(refeicao);
    }
        
    sumVe(refeicao: RefeicaoPlano) {
        let sum = 0;
        refeicao.getItens().forEach(i => {
            sum += i.getVe();
        });
        refeicao.setSomatorio(sum);
        this.calculateSumVe();
    }
    
    roundComparacao(valor) {
        return Math.round(valor);
    }
}