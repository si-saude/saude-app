import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Alimento } from './../../../model/alimento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AlimentoBuilder } from './../alimento.builder';
import { AlimentoService } from './../alimento.service';

@Component( {
    selector: 'app-alimento-form-detail',
    templateUrl: './alimento-form-detail.html',
    styleUrls: ['./alimento-form.css', './../../../../assets/css/form-component.css']
} )
export class AlimentoFormDetailComponent extends GenericFormComponent implements OnInit {
    alimento: Alimento;
    private tipos: Array<string>;

    constructor( private route: ActivatedRoute,
        private alimentoService: AlimentoService,
        router: Router) {
        super( alimentoService, router );

        this.goTo = "alimento";
        this.alimento = new AlimentoBuilder().initialize( this.alimento );
        this.tipos = new Array<string>();
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.alimento = new AlimentoBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
        
        this.getTipos();
    }
    
    getTipos() {
        this.alimentoService.getTipos()
            .then(res => {
                this.tipos = Object.keys( res.json() ).sort();
            })
            .catch(error => {
                this.catchConfiguration(error);
            })
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

}