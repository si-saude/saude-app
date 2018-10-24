import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { FeriadoFilter } from './feriado.filter';
import { GenericService } from './../../generics/generic.service';

@Injectable()
export class FeriadoService extends GenericService {
    
    constructor( http: Http, router: Router) { 
        super( http, router, "feriado" );
    }
    
    getFeriados() {
        return this.selectList(new FeriadoFilter());
    }
    
    getDateAfterNDays(date: Date, n: number) {
        let urlGet = this.URL + "/get-date-after-nday"
        return this.http
            .get( urlGet + "?data=" + date.toString() +"&dias="+n, { headers: this.headers } )
            .toPromise();
    }
    
    getDaysBetweenDates(date1: Date, date2: Date) {
        let urlGet = this.URL + "/get-days-between-dates"
        return this.http
            .get( urlGet + "?data1=" + date1.toString() +"&data2="+ date2.toString(), { headers: this.headers } )
            .toPromise();
    }
    
}