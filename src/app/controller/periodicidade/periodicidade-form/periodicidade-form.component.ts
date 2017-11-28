import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Periodicidade } from './../../../model/periodicidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { PeriodicidadeBuilder } from './../periodicidade.builder';
import { PeriodicidadeFilter } from './../periodicidade.filter';
import { PeriodicidadeService } from './../periodicidade.service';

@Component( {
    selector: 'app-periodicidade-form',
    templateUrl: './periodicidade-form.html',
    styleUrls: ['./periodicidade-form.css']
} )
export class PeriodicidadeFormComponent extends GenericFormComponent implements OnInit {
    periodicidade: Periodicidade;
    
    periodicidadeFilter: PeriodicidadeFilter = new PeriodicidadeFilter();
    
    constructor( private route: ActivatedRoute,
        private periodicidadeService: PeriodicidadeService) { 
        super(periodicidadeService);
        this.goTo = "periodicidade";
        
        this.periodicidade = new PeriodicidadeBuilder().initialize(this.periodicidade);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.periodicidadeService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.periodicidade = new PeriodicidadeBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
                  
    }
    
    save() {
        super.save(new PeriodicidadeBuilder().clone(this.periodicidade));
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
}
