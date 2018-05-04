import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { RiscoGhe } from './../../../model/risco-ghe';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoGheBuilder } from './../risco-ghe.builder';
import { RiscoGheService } from './../risco-ghe.service';

@Component({
  selector: 'app-risco-ghe-form-detail',
  templateUrl: './risco-ghe-form-detail.component.html',
  styleUrls: ['./risco-ghe-form.component.css', './../../../../assets/css/form-component.css']
})
export class RiscoGheFormDetailComponent extends GenericFormComponent implements OnInit {
    
    risco: RiscoGhe;

    constructor( private route: ActivatedRoute,
        private riscoService: RiscoGheService,
        router: Router) {
        super( riscoService, router );
    
        this.goTo = "risco-ghe";
        this.risco = new RiscoGheBuilder().initialize( this.risco );
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
                            this.risco = new RiscoGheBuilder().clone( res.json() );
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
