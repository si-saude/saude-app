import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Empresa } from './../../../model/empresa';
import { Cidade } from './../../../model/cidade';
import { CidadeBuilder } from './../../cidade/cidade.builder';
import { EmpresaBuilder } from './../empresa.builder';
import { EmpresaService } from './../empresa.service';
import { CidadeNomeAutocomplete } from './../../cidade/cidade-nome.autocomplete';
import { Cnae } from './../../../model/cnae';
import { CnaeBuilder } from './../../cnae/cnae.builder';
import { TextUtil } from './../../../generics/utils/text.util';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-empresa-form',
    templateUrl: './empresa-form.html',
    styleUrls: ['./empresa-form.css', './../../../../assets/css/form-component.css']
} )
export class EmpresaFormComponent extends GenericFormComponent implements OnInit {
    private empresa: Empresa;
    private cidadeNomeAutocomplete: CidadeNomeAutocomplete;
    private cnae: Cnae;
    private textUtil: TextUtil;
    
    constructor( private route: ActivatedRoute,
        private empresaService: EmpresaService,
        router: Router) {
        super( empresaService, router );
        
        this.goTo = "empresa";
        this.empresa = new EmpresaBuilder().initialize( this.empresa );
        this.cidadeNomeAutocomplete = new CidadeNomeAutocomplete(this.empresaService.getCidadeService());
        this.cnae = new CnaeBuilder().initialize(null);
        this.textUtil = new TextUtil();
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
                            this.empresa = new EmpresaBuilder().clone( res.json() );
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
    
    save() {
        super.save( new EmpresaBuilder().clone( this.empresa ) );
    }
    
    addCnae() {
        if ( this.empresa.getCnaes().find( c => c.getCodigo() == this.cnae.getCodigo() ) != undefined ) {
            this.textUtil.showTextToast("N&atilde;o &eacute; poss&iacute;vel adicionar c&oacute;digos repetidos.", 4000);
            return;
        }
        if ( this.cnae.getCodigo() != "" )
            this.empresa.getCnaes().push(this.cnae);
        
        this.cnae = new CnaeBuilder().initialize(null);
    }
        
    removeCnae( index ) {
        this.empresa.getCnaes().splice(index, 1);
    }
}