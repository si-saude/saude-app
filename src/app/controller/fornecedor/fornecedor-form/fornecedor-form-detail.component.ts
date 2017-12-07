import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { Fornecedor } from './../../../model/fornecedor';
import { Cidade } from './../../../model/cidade';
import { Telefone } from './../../../model/telefone';
import { FornecedorService } from './../fornecedor.service';
import { FornecedorFilter } from './../fornecedor.filter';
import { FornecedorBuilder } from './../fornecedor.builder';
import { Periodicidade } from './../../../model/periodicidade';
import { GenericFormComponent } from './../../../generics/generic.form.component';

@Component( {
    selector: 'app-fornecedor-form-detail',
    templateUrl: './fornecedor-form-detail.html',
    styleUrls: ['./fornecedor-form.css', './../../../../assets/css/form-component.css']
} )
export class FornecedorFormDetailComponent extends GenericFormComponent implements OnInit {
    fornecedor: Fornecedor;
    tiposPessoa: Array<string>;
    cidades: Array<Cidade>;
    
    fornecedorFilter: FornecedorFilter = new FornecedorFilter();
    
    constructor( private route: ActivatedRoute,
        private fornecedorService: FornecedorService) { 
        super(fornecedorService);
        this.goTo = "fornecedor";
        
        this.fornecedor = new FornecedorBuilder().initialize(this.fornecedor);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                let id = params['id'];
                this.showPreload = true;

                this.fornecedorService.get( id )
                    .then( res => {
                        this.showPreload = false;
                        this.fornecedor = new FornecedorBuilder().clone(res.json());
                    } )
                    .catch( error => {
                        this.catchConfiguration( error );
                    } )
            } );
            
      this.fornecedorService.getTiposPessoa()
          .then(res => {
              this.tiposPessoa = Object.keys(res.json());
          })
          .catch(error => {
              console.log(error);
          })
      
      this.fornecedorService.getCidades()
          .then(res => {
              this.cidades = res.json();
          })
          .catch(error => {
              console.log(error);
          })
            
    }

    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
