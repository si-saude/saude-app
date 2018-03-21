import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { GlobalVariable } from './../../../global';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { RiscoPotencialService } from './../risco-potencial.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.html',
  styleUrls: ['./acoes.css', './../../../../assets/css/form-component.css']
})
export class AcoesComponent extends GenericFormComponent implements OnInit {
    
    constructor(private route: ActivatedRoute,
            private riscoPotencialService: RiscoPotencialService,
            router: Router) {
            super( riscoPotencialService, router );
        
            this.goTo = "risco-potencial";
    }
    
    ngOnInit() {
    }
    
    ngOnDestroy() {
    }
}
