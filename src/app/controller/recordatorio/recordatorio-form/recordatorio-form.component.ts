import { Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { Util } from './../../../generics/utils/util';
import { GlobalVariable } from './../../../global';
import { Recordatorio } from './../../../model/recordatorio';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RecordatorioBuilder } from './../recordatorio.builder';
import { RecordatorioService } from './../recordatorio.service';
import { Refeicao } from './../../../model/refeicao';
import { RefeicaoBuilder} from './../../refeicao/refeicao.builder';
import { ItemRefeicao } from './../../../model/item-refeicao';
import { ItemRefeicaoBuilder} from './../../item-refeicao/item-refeicao.builder';
import { AlimentoNomeAutocomplete } from './../../alimento/alimento-nome.autocomplete';
import { MedidaAlimentarDescricaoAutocomplete } from './../../medida-alimentar/medida-alimentar-descricao.autocomplete';
import { RecordatorioRefeicaoComponent } from './../../../includes/recordatorio-refeicao/recordatorio-refeicao.component';
import { ItemRefeicaoComponent } from './../../../includes/item-refeicao/item-refeicao.component';

import { AlimentoBuilder } from './../../alimento/alimento.builder';
import { MedidaAlimentarBuilder } from './../../medida-alimentar/medida-alimentar.builder';
import { Alimento } from './../../../model/alimento';

@Component( {
    selector: 'app-recordatorio-form',
    templateUrl: './recordatorio-form.html',
    styleUrls: ['./recordatorio-form.css', './../../../../assets/css/form-component.css']
} )
export class RecordatorioFormComponent extends GenericFormComponent implements OnInit {
    private empregado: string;
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
    private somatorioVe: number = 0;
    @ViewChild( RecordatorioRefeicaoComponent ) modalRefeicao: RecordatorioRefeicaoComponent;
    @ViewChild( ItemRefeicaoComponent ) itemRefeicaoComponent: ItemRefeicaoComponent;

    constructor( private route: ActivatedRoute,
        private recordatorioService: RecordatorioService,
        router: Router) {
        super( recordatorioService, router );
        
        this.goTo = "recordatorio";
        this.recordatorio = new RecordatorioBuilder().initialize( this.recordatorio );
        this.refeicao = new RefeicaoBuilder().initialize( this.refeicao );
        this.itemEdit = new ItemRefeicaoBuilder().initialize( this.itemEdit );
        this.itemNew = new ItemRefeicaoBuilder().initialize( this.itemNew );
        this.alimentoAutocompleteNew = new AlimentoNomeAutocomplete(recordatorioService.getAlimentoService());
        this.alimentoAutocompleteEdit = new AlimentoNomeAutocomplete(recordatorioService.getAlimentoService());
        this.medidaAlimentarNew = new MedidaAlimentarDescricaoAutocomplete(recordatorioService.getMedidaAlimentarService());
        this.medidaAlimentarEdit = new MedidaAlimentarDescricaoAutocomplete(recordatorioService.getMedidaAlimentarService());
        this.modalRefeicao = new RecordatorioRefeicaoComponent();
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
                            this.recordatorio = new RecordatorioBuilder().clone( res.json() );
                            this.recordatorio.getAtendimento().setId(idAtendimento);
                            
                            this.recordatorio.getRefeicoes().forEach(r => this.sumVe(r));
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
                    this.getNe();
                }
            } );
    }   
    

    copyToClipboard(element) {
      var $temp = $("<textarea>");
      $("body").append($temp);
      
      let texto = "" ;
      this.recordatorio.getRefeicoes().forEach(x=>{
          
          texto += x.getNome()+"\n";             
          texto +="Quantidade | Medida | Alimento | VE \n";
          x.getItens().forEach(i=>{
          texto += i.getQuantidade() +" | "+ i.getMedidaCaseira().getDescricao()+" | "+ i.getAlimento().getNome() +" | "+ i.getVe()+" \n";
         })
         
         texto += "\n"
      });
      $temp.val(texto).select();
      document.execCommand("copy");
      $temp.remove();
    }
    
    getNe() {
        this.recordatorioService.getNe(this.recordatorio)
            .then(res => {
                let atendimento = res.json()["atendimento"];
                this.recordatorio = new RecordatorioBuilder().clone( res.json() );
                this.recordatorio.setAtendimento(atendimento);
            })
            .catch(error => {
                this.catchConfiguration( error );
            })
    }
    
    calculateSumVe() {
        this.somatorioVe = 0;
        this.recordatorio.getRefeicoes().forEach(r => {
            this.somatorioVe += r.getSomatorio();
        })
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        let idAtendimento = this.recordatorio.getAtendimento()["id"];  
        this.recordatorio = new RecordatorioBuilder().clone( this.recordatorio );  
        this.recordatorio.getAtendimento().setId(idAtendimento);
        
        super.save( this.recordatorio );
    }
    
    selectRefeicao(ref: Refeicao, r: number) {
        this.refeicao = ref;
        this.editRefeicao = true;
        for(let i=0; i<this.recordatorio.getRefeicoes().length;i++)
            $("."+i).css("background-color", "#fff");
        $("."+r).css("background-color", "#d8d8d8");
    }
    
    selectItemRefeicao(it: ItemRefeicao) {
        this.itemEdit = it;
        this.editItem = true;
    }
    
    removeRefeicao(r) {
        this.recordatorio.getRefeicoes().splice(r, 1);
        this.editRefeicao = false;
        this.calculateSumVe();
    }
    
    addItemRefeicao() {
        if ( this.itemNew.getAlimento() == undefined ||
        this.itemNew.getAlimento().getId() == undefined ||
        this.itemNew.getAlimento().getId() <= 0 ||
        this.itemNew.getMedidaCaseira() == undefined ||
        this.itemNew.getMedidaCaseira()["id"] == undefined ||
        this.itemNew.getMedidaCaseira()["id"] <= 0 ||                   
        this.itemNew.getQuantidade() == undefined ||
        this.itemNew.getQuantidade().toString() == '0,00' ||
        this.itemNew.getQuantidade() <= 0 ) {
            this.callToast("Por favor, preencha todos os campos corretamente.", 4000)
            return;
        }else{
            this.refeicao.getItens().push(this.itemNew);
            this.itemNew = new ItemRefeicaoBuilder().initialize(null);
            $('#quantidade_item').val(0);
            this.sumVe(this.refeicao);
            this.calculateSumVe();        
        }
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
    
    addRefeicao(refeicao: Refeicao) {
        this.recordatorio.getRefeicoes().push(refeicao);
    }
        
    sumVe(refeicao: Refeicao) {
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
    
    sumNutriente(ref: Refeicao, campo) {
        let sum: number = 0;   
   
        ref.getItens().forEach(i => {
            if ( i.getAlimento()[campo] != undefined ){
                sum += Number(Number(Util.treatDouble(i.getAlimento()[campo]))*Util.treatDouble(i.getQuantidade()));
            }
        })
        return sum;
    }
}