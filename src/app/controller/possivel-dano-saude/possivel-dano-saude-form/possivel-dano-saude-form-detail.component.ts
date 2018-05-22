import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { PossivelDanoSaude } from './../../../model/possivel-dano-saude';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { PossivelDanoSaudeBuilder } from './../possivel-dano-saude.builder';
import { PossivelDanoSaudeService } from './../possivel-dano-saude.service'; 

@Component({
  selector: 'app-possivel-dano-saude-form-detail',
  templateUrl: './possivel-dano-saude-form-detail.html',
  styleUrls: ['./possivel-dano-saude-form.css','./../../../../assets/css/form-component.css']
})
export class PossivelDanoSaudeFormDetailComponent extends GenericFormComponent implements OnInit {
    private possivelDanoSaude: PossivelDanoSaude;

    constructor( private route: ActivatedRoute,
        private possivelDanoSaudeService: PossivelDanoSaudeService,
        router: Router) {
        super(possivelDanoSaudeService, router );
        this.goTo = "possivel-dano-saude";
        this.possivelDanoSaude = new PossivelDanoSaudeBuilder().initialize( this.possivelDanoSaude );
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
                            this.possivelDanoSaude = new PossivelDanoSaudeBuilder().clone( res.json() );
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
