import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Exame } from './../../../model/exame';
import { ExameService } from './../exame.service';
import { ExameFilter } from './../exame.filter';
import { ExameBuilder } from './../exame.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-exame-form',
    templateUrl: './exame-form.html',
    styleUrls: ['./exame-form.css']
} )
export class ExameFormComponent extends GenericFormComponent<Exame> implements OnInit {
    exame: Exame;
    
    exameFilter: ExameFilter = new ExameFilter();
    
    constructor( private route: ActivatedRoute,
        private exameService: ExameService) { 
        super(exameService);
        this.goTo = "exame";
        
        this.exame = new ExameBuilder().initialize(this.exame);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.exameService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.exame = new ExameBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
            
    }
    
    
    save() {
        super.save(new ExameBuilder().clone(this.exame));
    }   


    isPossibleDeactivate() {
//        if ( this.formulario.dirty ) {
//            return false;
//        } else return true;
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
