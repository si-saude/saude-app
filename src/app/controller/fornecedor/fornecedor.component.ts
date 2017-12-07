import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { Fornecedor } from './../../model/fornecedor';
import { FornecedorFilter } from './fornecedor.filter';
import { FornecedorGuard } from './../../guards/guards-child/fornecedor.guard';
import { FornecedorService } from './fornecedor.service';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css', '../../../assets/css/list-component.css']
})
export class FornecedorComponent extends GenericListComponent<Fornecedor, FornecedorFilter, FornecedorGuard> {
    tiposPessoa: Array<string>;
    
    constructor(fornecedorService: FornecedorService, fornecedorGuard: FornecedorGuard) {
        super(fornecedorService, new FornecedorFilter(), fornecedorGuard);
        
        this.tiposPessoa = new Array<string>();
        
        fornecedorService.getTiposPessoa()
            .then(res => {
                this.tiposPessoa = Object.keys(res.json());
            })
            .catch(error => {
                console.log(error);
            })
    }

}