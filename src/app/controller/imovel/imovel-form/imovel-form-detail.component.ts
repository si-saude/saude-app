import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Imovel } from './../../../model/imovel';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ImovelBuilder } from './../imovel.builder';
import { ImovelService } from './../imovel.service';

@Component( {
    selector: 'app-imovel-form-detail',
    templateUrl: './imovel-form-detail.html',
    styleUrls: ['./imovel-form.css', './../../../../assets/css/form-component.css']
} )
export class ImovelFormDetailComponent extends GenericFormComponent implements OnInit {
    imovel: Imovel;

    constructor( private route: ActivatedRoute,
        private imovelService: ImovelService,
        router: Router) {
        super( imovelService, router );

        this.goTo = "imovel";
        this.imovel = new ImovelBuilder().initialize( this.imovel );
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.service.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.imovel = new ImovelBuilder().clone( res.json() );
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

}