import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { TipoGrupoMonitoramento } from './../../../model/tipo-grupo-monitoramento';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { TipoGrupoMonitoramentoBuilder } from './../tipo-grupo-monitoramento.builder';
import { TipoGrupoMonitoramentoService } from './../tipo-grupo-monitoramento.service';

@Component( {
    selector: 'app-tipo-grupo-monitoramento-form',
    templateUrl: './tipo-grupo-monitoramento-form.html',
    styleUrls: ['./tipo-grupo-monitoramento-form.css']
} )
export class TipoGrupoMonitoramentoFormComponent extends GenericFormComponent<TipoGrupoMonitoramento> implements OnInit { 
    tipoGrupoMonitoramento: TipoGrupoMonitoramento;
    
    constructor( private route: ActivatedRoute,
            private tipoGrupoMonitoramentoService: TipoGrupoMonitoramentoService) { 
            super(tipoGrupoMonitoramentoService);
            this.goTo = "tipo-grupo-monitoramento";
            
            this.tipoGrupoMonitoramento = new TipoGrupoMonitoramentoBuilder().initialize(this.tipoGrupoMonitoramento);
        }
    
    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.tipoGrupoMonitoramentoService.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.tipoGrupoMonitoramento = new TipoGrupoMonitoramentoBuilder().clone(res.json());
                        } )
                        .catch( error => {
                            this.showPreload = false;
                            console.log( error );
                        } )
                }
            } );
        
    }
    
    save() {
        super.save(new TipoGrupoMonitoramentoBuilder().clone(this.tipoGrupoMonitoramento));
    }   
    
    
}