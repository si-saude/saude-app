import { Component, OnInit } from '@angular/core';

import { GenericListComponent } from './../../generics/generic.list.component';
import { Fornecedor } from './../../model/fornecedor';
import { FornecedorFilter } from './fornecedor.filter';
import { FornecedorService } from './fornecedor.service';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent extends GenericListComponent<Fornecedor, FornecedorFilter> {

    constructor(fornecedorService: FornecedorService) {
        let fornecedorFilter: FornecedorFilter = new FornecedorFilter();
        super(fornecedorService, fornecedorFilter);
    }

}