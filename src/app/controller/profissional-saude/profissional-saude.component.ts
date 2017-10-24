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
  styleUrls: ['./profissional-saude.component.css']
})
export class ProfissionalSaudeComponent extends GenericListComponent<Profissional, ProfissionalSaudeFilter> {
    
    constructor(profissionalSaudeService: ProfissionalSaudeService) {
        let profissionalSaudeFilter: ProfissionalSaudeFilter = new ProfissionalSaudeFilter();
        super(profissionalSaudeService, profissionalSaudeFilter);
    }
    
    initializeFilterDate() {
        if (this.filter.getDataNascimento().getInicio() !== null && 
                this.filter.getDataNascimento().getInicio() !== undefined ) {
            this.filter.getDataNascimento().setInicio(
                    this.parseDatePickerToDate(this.filter.getDataNascimento().getInicio()));
        }
        
        if (this.filter.getDataNascimento().getFim() !== null && 
                this.filter.getDataNascimento().getFim() !== undefined ) {
            this.filter.getDataNascimento().setFim(
                    this.parseDatePickerToDate(this.filter.getDataNascimento().getFim()));
        }
    }
    
    setFilter() {
        this.initializeFilterDate();
        super.setFilter();
    }
      
}