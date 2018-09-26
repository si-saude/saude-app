import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ClassificacaoAfastamento } from './../../model/classificacao-afastamento';
import { ClassificacaoAfastamentoService } from './classificacao-afastamento.service';
import { ClassificacaoAfastamentoFilter } from './classificacao-afastamento.filter';
import { ClassificacaoAfastamentoGuard } from './../../guards/guards-child/classificacao-afastamento.guard';
import { GenericListComponent } from './../../generics/generic.list.component';
import { CheckboxUtil } from './../../generics/utils/checkbox.util'; 

@Component({
  selector: 'app-classificacao-afastamento',
  templateUrl: './classificacao-afastamento.component.html',
  styleUrls: ['./classificacao-afastamento.component.css', '../../../assets/css/list-component.css']
})
export class ClassificacaoAfastamentoComponent extends GenericListComponent<ClassificacaoAfastamento, ClassificacaoAfastamentoFilter, ClassificacaoAfastamentoGuard> {
  geraAfastamento: CheckboxUtil;

  constructor(service: ClassificacaoAfastamentoService, classificacaoAfastamentoGuard: ClassificacaoAfastamentoGuard, router: Router) {
      super(service, new ClassificacaoAfastamentoFilter(), classificacaoAfastamentoGuard, router);
  }
  
  ngAfterViewInit() {
      this.geraAfastamento = new CheckboxUtil(document.getElementById("geraAfastamento") as HTMLInputElement);
  }
  
  filtrar() {
      this.filter.getGeraAfastamento().setValue(this.geraAfastamento.getValue());
      
      this.setFilter();
  }
  
}