import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Imovel } from './../../../model/imovel';
import { Base } from './../../../model/base';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { ImovelBuilder } from './../imovel.builder';
import { ImovelService } from './../imovel.service';
import { BaseBuilder } from './../../base/base.builder';

@Component( {
    selector: 'app-imovel-form',
    templateUrl: './imovel-form.html',
    styleUrls: ['./imovel-form.css', './../../../../assets/css/form-component.css']
} )
export class ImovelFormComponent extends GenericFormComponent implements OnInit {
    private imovel: Imovel;
    private bases: Array<Base>;

    constructor( private route: ActivatedRoute,
        private imovelService: ImovelService,
        router: Router) {
        super( imovelService, router );

        this.goTo = "imovel";
        this.imovel = new ImovelBuilder().initialize( this.imovel );
        this.bases = new Array<Base>();
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
                            this.imovel = new ImovelBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getBases();
    }
    
    getBases() {
        this.imovelService.getBases()
            .then(res => {
                this.bases = new BaseBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao retornar bases.");
            })
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        super.save( new ImovelBuilder().clone( this.imovel ) );
    }
}