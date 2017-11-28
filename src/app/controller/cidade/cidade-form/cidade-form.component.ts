import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Cidade } from './../../../model/cidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { CidadeBuilder } from './../cidade.builder';
import { CidadeService } from './../cidade.service';

@Component( {
    selector: 'app-cidade-form',
    templateUrl: './cidade-form.html',
    styleUrls: ['./cidade-form.css', './../../../../assets/css/form-component.css']
} )
export class CidadeFormComponent extends GenericFormComponent implements OnInit { 
    cidade: Cidade;
    
    constructor( private route: ActivatedRoute,
            private cidadeService: CidadeService) { 
            super(cidadeService);
            
            this.goTo = "cidade";
            this.cidade = new CidadeBuilder().initialize(this.cidade);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.cidadeService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.cidade = new CidadeBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new CidadeBuilder().clone(this.cidade));
    }   
    
    
}