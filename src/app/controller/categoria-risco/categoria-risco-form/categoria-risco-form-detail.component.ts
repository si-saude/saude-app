import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { CategoriaRisco } from './../../../model/categoria-risco';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CategoriaRiscoBuilder } from './../categoria-risco.builder';
import { CategoriaRiscoService } from './../categoria-risco.service'; 

@Component({
  selector: 'app-categoria-risco-form-detail',
  templateUrl: './categoria-risco-form-detail.html',
  styleUrls: ['./categoria-risco-form.css','./../../../../assets/css/form-component.css']
})
export class CategoriaRiscoFormDetailComponent extends GenericFormComponent implements OnInit {
    private categoriaRisco: CategoriaRisco;

    constructor( private route: ActivatedRoute,
        private categoriaRiscoService: CategoriaRiscoService,
        router: Router) {
        super(categoriaRiscoService, router );
        this.goTo = "categoria-risco";
        this.categoriaRisco = new CategoriaRiscoBuilder().initialize( this.categoriaRisco );
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
                            this.categoriaRisco = new CategoriaRiscoBuilder().clone( res.json() );
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );        
    }
    
    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

}
