import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { GlobalVariable } from '../../global';
import { Clinica } from '../../model/clinica';
import { ClinicaFilter } from '../clinica/clinica.filter';
import { GenericService } from '../../generics/generic.service';
import { ExameService } from './../exame/exame.service';

@Injectable()
export class ClinicaService extends GenericService {

    constructor( http: Http, router: Router, private exameService: ExameService) { 
        super(http,router,"clinica");
    }
    
    getClinicas() {
        return this.selectList(new ClinicaFilter());
    }
    
    getExameService():ExameService{
        return this.exameService;
    }
}