import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { IndicadorSast } from './../../../model/indicador-sast';
import { IndicadorAssociadoSast } from './../../../model/indicador-associado-sast';
import { IndicadorSastService } from './../indicador-sast.service';
import { IndicadorSastFilter } from './../indicador-sast.filter';
import { IndicadorSastBuilder } from './../indicador-sast.builder';
import { Equipe } from './../../../model/equipe';
import { EquipeBuilder } from './../../equipe/equipe.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-indicador-sast-form-detail',
    templateUrl: './indicador-sast-form-detail.html',
    styleUrls: ['./indicador-sast-form.css', './../../../../assets/css/form-component.css']
} )
export class IndicadorSastFormDetailComponent extends GenericFormComponent implements OnInit {
    indicadorSast: IndicadorSast;
    equipes: Array<Equipe>;
    
    indicadorSastFilter: IndicadorSastFilter = new IndicadorSastFilter();
    
    constructor( private route: ActivatedRoute,
        private indicadorSastService: IndicadorSastService,
        router: Router) { 
        super(indicadorSastService, router);
        this.goTo = "indicador-sast";
        
        this.indicadorSast = new IndicadorSastBuilder().initialize(this.indicadorSast);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.indicadorSastService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.indicadorSast = new IndicadorSastBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
        
        this.getEquipes();
    }
    
    getEquipes() {
        this.indicadorSastService.getEquipes()
            .then(res => {
                this.equipes = new EquipeBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log(error);
            })        
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
