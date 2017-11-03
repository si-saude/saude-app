import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Criterio } from './../../../model/criterio';
import { CriterioService } from './../criterio.service';
import { CriterioFilter } from './../criterio.filter';
import { CriterioBuilder } from './../criterio.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-criterio-form',
    templateUrl: './criterio-form.html',
    styleUrls: ['./criterio-form.css']
} )
export class CriterioFormComponent extends GenericFormComponent implements OnInit {
    criterio: Criterio;
    tipos: Array<string>;
    
    criterioFilter: CriterioFilter = new CriterioFilter();
    
    constructor( private route: ActivatedRoute,
        private criterioService: CriterioService) { 
        super(criterioService);
        this.goTo = "criterio";
        
        this.criterio = new CriterioBuilder().initialize(this.criterio);
    }

    ngOnInit() {
        
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.criterioService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.criterio = new CriterioBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
            
      this.criterioService.getTipos()
          .then(res => {
              this.tipos = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
            
    }
    
    save() {
        super.save(new CriterioBuilder().clone(this.criterio));
    }   
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
