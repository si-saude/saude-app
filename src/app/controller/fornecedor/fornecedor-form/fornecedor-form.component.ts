import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
    selector: 'app-fornecedor-form',
    templateUrl: './fornecedor-form.html',
    styleUrls: ['./fornecedor-form.css', './../../../../assets/css/form-component.css']
} )
export class FornecedorFormComponent extends GenericFormComponent implements OnInit {
    fornecedor: Fornecedor;
    tiposPessoa: Array<string>;
    cidades: Array<Cidade>;
    
    fornecedorFilter: FornecedorFilter = new FornecedorFilter();
    
    constructor( private route: ActivatedRoute,
        private fornecedorService: FornecedorService,
        router: Router) { 
        super(fornecedorService, router);
        this.goTo = "fornecedor";
        
        this.fornecedor = new FornecedorBuilder().initialize(this.fornecedor);
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {
                if( params['id'] !== undefined ) {
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
                }
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
    
    save() {
        super.save(new FornecedorBuilder().clone(this.fornecedor));
    }   

    addTelefone() {
        if ( this.fornecedor.getTelefones() === undefined ) {
            this.fornecedor.setTelefones(new Array<Telefone>());   
        }
        this.fornecedor.getTelefones().push(new Telefone());
    }

    removeTelefone(i: number) {
        this.fornecedor.getTelefones().splice(i, 1);
    }
    
    onDestroy() {
        this.inscricao.unsubscribe();
    }
    
}
