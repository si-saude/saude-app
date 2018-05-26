import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MaterializeAction } from "angular2-materialize";
import { MyDatePickerModule } from 'mydatepicker';

import { Ghe } from './../../../model/ghe';
import { GlobalVariable } from './../../../global';
import { Aprho } from './../../../model/aprho';
import { GenericFormComponent } from './../../../generics/generic.form.component';
import { AprhoBuilder } from './../aprho.builder';
import { GheBuilder } from './../../ghe/ghe.builder';
import { AprhoService } from './../aprho.service';

@Component( {
    selector: 'app-aprho-form',
    templateUrl: './aprho-form.html',
    styleUrls: ['./aprho-form.css', './../../../../assets/css/form-component.css']
} )
export class AprhoFormComponent extends GenericFormComponent implements OnInit {
    private aprho: Aprho;
    private data: any;
    private flagIdGhe : number;
    private arrayGhe: Array<Ghe>;
    private modalGhe;
    private value;
    private filter;
    private typeFilter;
    
    constructor( private route: ActivatedRoute,
        private aprhoService: AprhoService,
        router: Router) {
        super( aprhoService, router );

        this.goTo = "aprho";
        this.modalGhe = new EventEmitter<string | MaterializeAction>();
        this.aprho = new AprhoBuilder().initialize( this.aprho );
        this.filter = "";
    }

    ngOnInit() {
        this.inscricao = this.route.params.subscribe(
            ( params: any ) => {                
                
                if ( params['id'] !== undefined ) {
                    let id = params['id'];
                    this.showPreload = true;

                    this.service.get( id )
                        .then( res => {
                            this.showPreload = false;
                            this.aprho = new AprhoBuilder().clone( res.json() );
                            this.parseAndSetDates();
                        } )
                        .catch( error => {
                            this.catchConfiguration( error );
                        } )
                }
            } );
    }
    

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }
    
    save() {
        this.verifyAndSetDates();
        super.save( new AprhoBuilder().clone( this.aprho ) );
    }
    
    verifyAndSetDates() {
        if ( this.data !== null &&
            this.data !== undefined )
            this.aprho.setData(
                this.parseDatePickerToDate( this.data ) );
    }
    
    parseAndSetDates() {
        if ( this.aprho.getData() !== null &&
            this.aprho.getData() !== undefined ) {
            this.data = this.parseDataToObjectDatePicker( this.aprho.getData() );
        }
    }
    
    openModalGhe( ghe: Ghe ) {
        this.value = "$*new*$";
        this.filter = $("input[name='filter-ghe-descricao']").val('');
        this.flagIdGhe = ghe.getId();
        this.fetchGhe()
        this.modalGhe.emit( { action: "modal", params: ['open'] } );
    }
    
    fetchGhe() {
        this.aprhoService.getGhes()
            .then(res => {
                this.arrayGhe = new GheBuilder().cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar o diagnostico por descricao");
            })
    }
    
    selectGhe( ghe: Ghe ) {
        this.aprho.setGhe(ghe);
        this.modalGhe.emit( { action: "modal", params: ['close'] } );
    }
    
    cancelarModalGhe() {
        this.modalGhe.emit( { action: "modal", params: ['close'] } );
    }
    
    selectFilter( event, type: string ) {
        let splitType = type.split('-');   
        this.filter = event;
        this.typeFilter = splitType[2];
        this.value = $('input[name='+type).val();
    }
    
}