import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MaterializeAction } from "angular2-materialize";

import { GlobalVariable } from './../../../global';
import { Ghe } from './../../../model/ghe';
import { RiscoGhe } from './../../../model/risco-ghe';
import { GheService } from './../ghe.service';
import { GheFilter } from './../ghe.filter';
import { GheBuilder } from './../ghe.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-ghe-form',
    templateUrl: './ghe-form.html',
    styleUrls: ['./ghe-form.css', './../../../../assets/css/form-component.css']
} )
export class GheFormComponent extends GenericFormComponent implements OnInit {
    riscoGhes: Array<RiscoGhe>;
    ghe: Ghe;
    
    gheFilter: GheFilter = new GheFilter();

    constructor( private route: ActivatedRoute,
        private gheService: GheService,
        router: Router) { 
        super(gheService, router);
        this.goTo = "ghe";

        this.ghe = new GheBuilder().initialize(this.ghe);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    
                    this.gheService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.ghe = new GheBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getRiscoGhes();
    }
    
    getRiscoGhes() {
        this.gheService.getRiscoGhes() 
            .then(res => {
                this.riscoGhes = res.json();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    save() {
        super.save(new GheBuilder().clone(this.ghe));
    }   
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }

}
