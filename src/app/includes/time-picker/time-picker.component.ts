import { EventEmitter, SimpleChanges, Component, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from './../../../../src/app/global';
import { CustomDate} from './../../generics/utils/custom-date.util';
import { Util } from './../../generics/utils/util';

import { MaterializeAction } from "angular2-materialize";

@Component( {
    selector: 'app-time-picker',
    templateUrl: './time-picker.html',
    styleUrls: ['./time-picker.css']
} )
export class TimePickerComponent {

    @Input() customDate:CustomDate;
    @Input() nome;
    @Input() obrigatorio : boolean;
    @Input() desabilitar : boolean;
    @Output() change: EventEmitter<CustomDate>;
    
    private horaAux:string = "";
    private timeActions: EventEmitter<string|MaterializeAction>;
    
    constructor( router: Router) {
        this.timeActions = new EventEmitter<string|MaterializeAction>();
        this.change = new EventEmitter<CustomDate>();
    }
    
    readOnly(){        
        return false;
    }

    public openTimePicker(){
        if(!this.desabilitar)
           this.timeActions.emit({action:"pickatime",params:["show"]});
    }
    
    setarHora(){
        $("#"+this.nome).val(this.horaAux)
        this.customDate.setAppTime(this.horaAux);
        
    }
    
    changeTimePicker(event) {        
        this.customDate.setAppTime(event)
        if(Util.isNotNull(this.customDate.getAppTime()))
            this.change.emit(this.customDate);
    }
}