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

@Component( {
    selector: 'app-recordatorio-form-detail',
    templateUrl: './recordatorio-form-detail.html',
    styleUrls: ['./recordatorio-form.css', './../../../../assets/css/form-component.css']
} )
export class RecordatorioFormDetailComponent extends GenericFormComponent implements OnInit {
    recordatorio: Recordatorio;
    private refeicao: Refeicao;
    private editRefeicao: boolean;
    private empregado: string;

    constructor( private route: ActivatedRoute,
        private recordatorioService: RecordatorioService,
        router: Router) {
        super( recordatorioService, router );

        this.refeicao = new RefeicaoBuilder().initialize( this.refeicao );
        this.goTo = "recordatorio";
        this.recordatorio = new RecordatorioBuilder().initialize( this.recordatorio );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if ( params['empregado'] !== undefined )
                    this.empregado = params['empregado'];
                
                let id = params['id'];
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
            } );
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    selectRefeicao(ref: Refeicao, r: number) {
        this.refeicao = ref;
        this.editRefeicao = true;
        for(let i=0; i<this.recordatorio.getRefeicoes().length;i++)
            $("."+i).css("background-color", "#fff");
        $("."+r).css("background-color", "#4ff7f1");
    }
        
    sumVe(r: number) {
        let sum = 0;
        this.recordatorio.getRefeicoes()[r].getItens().forEach(i => {
            sum += i.getVe();
        })
        return sum;
    }
    
}