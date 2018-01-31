import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Exame } from './../../../model/exame';
import { CampoExame } from './../../../model/campo-exame';
import { ExameService } from './../exame.service';
import { ExameFilter } from './../exame.filter';
import { ExameBuilder } from './../exame.builder';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-exame-form',
    templateUrl: './exame-form.html',
    styleUrls: ['./exame-form.css', './../../../../assets/css/form-component.css']
} )
export class ExameFormComponent extends GenericFormComponent implements OnInit {
    exame: Exame;
    indexCampoExame: number;
    codigoCampo: Array<string>;
    tituloCampo: Array<string>;
    numeroLinhasCampo: Array<string>;
    
    exameFilter: ExameFilter = new ExameFilter();
    
    constructor( private route: ActivatedRoute,
        private exameService: ExameService,
        router: Router) { 
        super(exameService, router);
        this.goTo = "exame";
        
        this.indexCampoExame = 0;
        this.codigoCampo = [];
        this.tituloCampo = [];
        this.numeroLinhasCampo = [];
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
                            this.catchConfiguration( error );
                        } )
                }
            } );
            
    }
    
    save() {
        super.save(new ExameBuilder().clone(this.exame));
    }
    
    addCampo() {
        if ( this.codigoCampo[this.indexCampoExame] == undefined ||
                this.codigoCampo[this.indexCampoExame].trim() == "" ||
                this.tituloCampo[this.indexCampoExame] == undefined ||
                this.tituloCampo[this.indexCampoExame].trim() == "" ||
                this.numeroLinhasCampo[this.indexCampoExame] == undefined || 
                this.numeroLinhasCampo[this.indexCampoExame].trim() == "" )
            return;
         
        let campoExame: CampoExame = new CampoExame();
        campoExame.setCodigo(this.codigoCampo[this.indexCampoExame]);
        campoExame.setTitulo(this.tituloCampo[this.indexCampoExame]);
        campoExame.setNumeroLinhas( parseInt(this.numeroLinhasCampo[this.indexCampoExame]));
        this.exame.getCampoExames().push(campoExame);
        this.indexCampoExame++;
    }
    
    removeCampo(index: number) {
        this.exame.getCampoExames().splice(index, 1);
    }

    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
