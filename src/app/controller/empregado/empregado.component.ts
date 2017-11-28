import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { Empregado } from './../../model/empregado';
import { EmpregadoService } from './empregado.service';
import { EmpregadoFilter } from './empregado.filter';
import { GenericListComponent } from './../../generics/generic.list.component';

@Component({
  selector: 'app-empregado',
  templateUrl: './empregado.component.html',
  styleUrls: ['./empregado.component.css', '../../../assets/css/list-component.css']
})
export class EmpregadoComponent extends GenericListComponent<Empregado, EmpregadoFilter> {
    
    constructor(empregadoService: EmpregadoService) {
        let empregadoFilter: EmpregadoFilter = new EmpregadoFilter();
        super(empregadoService, empregadoFilter);   
    }
    
    initializeFilterDate() {
        if (this.filter.getPessoa().getDataNascimento().getInicio() !== null && 
                this.filter.getPessoa().getDataNascimento().getInicio() !== undefined ) {
            this.filter.getPessoa().getDataNascimento().setInicio(
                    this.parseDatePickerToDate(this.filter.getPessoa().getDataNascimento().getInicio()));
        }
        
        if (this.filter.getPessoa().getDataNascimento().getFim() !== null && 
                this.filter.getPessoa().getDataNascimento().getFim() !== undefined ) {
            this.filter.getPessoa().getDataNascimento().setFim(
                    this.parseDatePickerToDate(this.filter.getPessoa().getDataNascimento().getFim()));
        }
    }
    
    setFilter() {
        this.initializeFilterDate();
        super.setFilter();
    }

}