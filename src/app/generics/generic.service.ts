import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

import { GlobalVariable } from './../global';
import { GenericFilter } from './generic.filter';

export abstract class GenericService {
    protected headers: Headers;
    protected URL: string;
    
    constructor(protected http: Http, protected router: Router, path:string) { 
        this.headers = new Headers( { 'Content-Type': 'application/json' } );
        this.URL = GlobalVariable.BASE_API_URL + "/" + path;
    }
    
    submit( formulario: any ) {
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
    
    list( genericFilter: GenericFilter) {
        let urlList = this.URL + "/list";
        return this.http
            .post( urlList, genericFilter, { headers: this.headers } )
            .toPromise();
    }
    
    delete( id ) {
        console.log(typeof(id));
        let urlDelete = this.URL + "/delete";
        return this.http
            .post( urlDelete, id, { headers: this.headers } )
            .toPromise();
    }
    
    selectList( genericFilter: GenericFilter ) {
        let urlList = this.URL + "/selectList";
        return this.http
            .post( urlList, genericFilter, { headers: this.headers } )
            .toPromise();
    }
}