import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { ClassificacaoAfastamento } from './../../../model/classificacao-afastamento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ClassificacaoAfastamentoBuilder } from './../classificacao-afastamento.builder';
import { ClassificacaoAfastamentoService } from './../classificacao-afastamento.service';

@Component( {
    selector: 'app-classificacao-afastamento-form-detail',
    templateUrl: './classificacao-afastamento-form-detail.html',
    styleUrls: ['./classificacao-afastamento-form.css', './../../../../assets/css/form-component.css']
} )
export class ClassificacaoAfastamentoFormDetailComponent extends GenericFormComponent implements OnInit {
    classificacaoAfastamento: ClassificacaoAfastamento;

    constructor( private route: ActivatedRoute,
        private classificacaoAfastamentoService: ClassificacaoAfastamentoService,
        router: Router) {
        super( classificacaoAfastamentoService, router );

        this.goTo = "classificacao-afastamento";
        this.classificacaoAfastamento = new ClassificacaoAfastamentoBuilder().initialize( this.classificacaoAfastamento );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.classificacaoAfastamentoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.classificacaoAfastamento = new ClassificacaoAfastamentoBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );

    }

}