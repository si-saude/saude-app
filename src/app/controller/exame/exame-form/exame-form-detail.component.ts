import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Exame } from './../../../model/exame';
import { ExameService } from './../exame.service';
import { ExameFilter } from './../exame.filter';
import { ExameBuilder } from './../exame.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-exame-form-detail',
    templateUrl: './exame-form-detail.html',
    styleUrls: ['./exame-form.css', './../../../../assets/css/form-component.css']
} )
export class ExameFormDetailComponent extends GenericFormComponent implements OnInit {
    exame: Exame;
    
    exameFilter: ExameFilter = new ExameFilter();
    
    constructor( private route: ActivatedRoute,
        private exameService: ExameService,
        router: Router) { 
        super(exameService, router);
        this.goTo = "exame";
        
        this.exame = new ExameBuilder().initialize(this.exame);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.exameService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.exame = new ExameBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
            
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
