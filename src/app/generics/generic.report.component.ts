import { ViewChild } from '@angular/core';

import { InterfaceServiceReport } from './../interfaces/interface.service.report';
import { InterfaceBuilder } from './../interfaces/interface.builder';
import { InterfaceDropdown } from './../interfaces/interface.dropdown';
import { DropdownCommon } from './../interfaces-implementations/dropdown.common';
import { DropdownCheckbox } from './../interfaces-implementations/dropdown.checkbox';
import { HttpUtil } from './utils/http.util';
import { TextUtil } from './utils/text.util';

export class GenericReportComponent<E> {
    @ViewChild( "mf" ) data;
    
    public entities: Array<E>;
    
    protected interfaceDropdown: InterfaceDropdown<E>;
    
    protected httpUtil: HttpUtil;
    protected textUtil: TextUtil;
    
    public filter: any;
    public typeFilter: string;
    public value: string;
    
    public arrayObjects = new Map();
    public arrayTypes: Array<string>;
    public countCheckbox: number = 0;

    constructor(private service: InterfaceServiceReport,
            private builder: InterfaceBuilder,
            private nameFileDownload: string) {
        this.entities = builder.initializeList(this.entities);
        this.textUtil = new TextUtil()
        this.httpUtil = new HttpUtil();
        this.filter = "";
        this.arrayTypes = new Array<string>();
    }
    
    ngOnInit() {
        this.getEntities();
    }
    
    ngAfterViewInit() {
        $( ".container" ).get( 0 ).style.width = "100%";
        
        $('#dropdown').mouseleave(function() {
            $('#dropdown').toggleClass('show');
        });
    }
    
    getEntities() {
        this.service.getEntities()
            .then(res => {
                this.entities = this.builder.cloneList(res.json());
            })
            .catch(error => {
                console.log("Erro ao buscar entidades."+error);
            })
    }
    
    selectFilter( event, type: string ) {
        this.filter = event.target.value;
        this.typeFilter = type;
        this.value = type;
    }
    
    exportFile() {
        if ( this.data.data.length > 0 )
            this.service.exportFile( this.data.data )
                .then(res => {
                    this.httpUtil.downloadFile(res, this.nameFileDownload);
                })
                .catch(error => {
                    console.log(error);
                })
    }
    
    dropdown( checkbox: boolean, tipo: string ) {
        this.interfaceDropdown = checkbox ? new DropdownCheckbox<E>(this) : new DropdownCommon<E>(this);
        
        this.interfaceDropdown.dropdown(tipo);
    }
    
    ngOnDestroy() {
        $( ".toast" ).remove();
        $( ".container" ).get( 0 ).style.width = "70%";
    }
    
}