import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

import { GlobalVariable } from './../global';
import { GenericFilter } from './generic.filter';

export abstract class GenericService {
    protected headers: Headers;
    protected URL: string;
    
    constructor(protected http: Http, protected router: Router, path:string) {
        this.headers = new Headers( { 'Content-Type': 'application/json' } );
        this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
        this.URL = GlobalVariable.BASE_API_URL + "/" + path;
    }
    
    submit( formulario: any ) {
        let urlSubmit = this.URL;
        return this.http
            .post( urlSubmit, formulario, { headers: this.headers } )
            .toPromise();
    }
    
    submitList( formulario: any ) {
        let urlSubmitList = this.URL + "/save-list";
        return this.http
            .post( urlSubmitList, formulario, { headers: this.headers } )
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
        let urlDelete = this.URL + "/delete";
        return this.http
            .post( urlDelete, id, { headers: this.headers } )
            .toPromise();
    }
    
    selectList( genericFilter: GenericFilter ) {
        genericFilter.setPageSize(Math.pow(2, 31)-1);
        let urlList = this.URL + "/selectList";
        return this.http
            .post( urlList, genericFilter, { headers: this.headers } )
            .toPromise();
    }
    
    sendFile( file ) {
        let urlSendFile = this.URL + "/import";
        this.headers = new Headers( { 'Content-Type': 'multipart/form-data' } );
        this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
        return this.http
            .post( urlSendFile, file, { headers: this.headers } )
            .toPromise();
    }
    
    sendFileWithPath( file, path ) {
        let urlSendFile = this.URL + "/" + path;
        this.headers = new Headers( { 'Content-Type': 'multipart/form-data' } );
        this.headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
        return this.http
            .post( urlSendFile, file, { headers: this.headers } )
            .toPromise();
    }
    
    sendFileAsObject( file ) {
        let urlSendFile = this.URL + "/import";
        return this.http
            .post( urlSendFile, file, { headers: this.headers } )
            .toPromise();
    }
}