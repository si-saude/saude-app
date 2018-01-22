import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { RequisitoAso } from './../../../model/requisito-aso';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RequisitoAsoBuilder } from './../requisito-aso.builder';
import { RequisitoAsoService } from './../requisito-aso.service';

@Component({
  selector: 'app-requisito-aso-form-detail',
  templateUrl: './requisito-aso-form-detail.html',
  styleUrls: ['./requisito-aso-form.css']
})
export class RequisitoAsoFormDetailComponent extends GenericFormComponent implements OnInit {
    requisito: RequisitoAso;

    constructor(private route: ActivatedRoute,
        private requisitoService: RequisitoAsoService) { 
        super(requisitoService);
        this.goTo = "requisito-aso";
          
        this.requisito = new RequisitoAsoBuilder().initialize(this.requisito);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.requisitoService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.requisito = new RequisitoAsoBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
    }

}
