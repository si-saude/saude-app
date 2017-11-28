import { Component, EventEmitter, OnInit } from '@angular/core';

import { GlobalVariable } from './../../global';
import { Profissional } from './../../model/profissional';
import { ProfissionalSaudeService } from './profissional-saude.service';
import { ProfissionalSaudeFilter } from './profissional-saude.filter';
import { GenericListComponent } from './../../generics/generic.list.component';
import { TypeFilter } from './../../generics/type.filter';

@Component({
  selector: 'app-profissional-saude',
  templateUrl: './profissional-saude.component.html',
  styleUrls: ['./profissional-saude.component.css', '../../../assets/css/list-component.css']
})
export class ProfissionalSaudeComponent extends GenericListComponent<Profissional, ProfissionalSaudeFilter> {
    
    constructor(profissionalSaudeService: ProfissionalSaudeService) {
        let profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
        super(profissionalSaudeService, profissionalSaudeFilter);
    }
    
    initializeFilterDate() {
        if (this.filter.getEmpregado().getPessoa().getDataNascimento().getInicio() !== null && 
                this.filter.getEmpregado().getPessoa().getDataNascimento().getInicio() !== undefined ) {
            this.filter.getEmpregado().getPessoa().getDataNascimento().setInicio(
                    this.parseDatePickerToDate(this.filter.getEmpregado().getPessoa().getDataNascimento().getInicio()));
        }
        
        if (this.filter.getEmpregado().getPessoa().getDataNascimento().getFim() !== null && 
                this.filter.getEmpregado().getPessoa().getDataNascimento().getFim() !== undefined ) {
            this.filter.getEmpregado().getPessoa().getDataNascimento().setFim(
                    this.parseDatePickerToDate(this.filter.getEmpregado().getPessoa().getDataNascimento().getFim()));
        }
    }
    
    setFilter() {
        this.initializeFilterDate();
        super.setFilter();
    }
      
}