import { Router } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GlobalVariable } from './../../global';
import { Gerencia } from './../../model/gerencia';
import { GerenciaFilter } from './gerencia.filter';

@Injectable()
export class GerenciaService {

    private headers = new Headers( { 'Content-Type': 'application/json' } );
    private URL: string = GlobalVariable.BASE_API_URL + "/gerencia";

    constructor( private http: Http, private router: Router ) { }

    submit( formulario: any ) {
        console.log( "submit" + JSON.stringify( formulario ) );
        let urlSubmit = this.URL;
        return this.http
            .post( urlSubmit, formulario, { headers: this.headers } )
            .toPromise();
    }

    get( id: number ) {
        let urlGet = this.URL;
        return this.http
            .get( urlGet + "?id=" + id, { headers: this.headers } )
            .toPromise();
    }

    list( gerenciaFilter: GerenciaFilter ) {
        let urlList = this.URL + "/list";
        return this.http
            .post( urlList, gerenciaFilter, { headers: this.headers } )
            .toPromise();
    }
    
    selectList( gerenciaFilter: GerenciaFilter ) {
        let urlList = this.URL + "/selectList";
        return this.http
            .post( urlList, gerenciaFilter, { headers: this.headers } )
            .toPromise();
    }

    delete( id ) {
        let urlDelete = this.URL + "/delete";
        return this.http
            .post( urlDelete, id, { headers: this.headers } )
            .toPromise();
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'Um erro ocorreu: ', error._body );
        return Promise.reject( error.message || error );
    }

}