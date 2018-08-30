import { EventEmitter, Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from './../../../../src/app/global';
import { CustomDate} from './../../generics/utils/custom-date.util';

import { MaterializeAction } from "angular2-materialize";

@Component( {
    selector: 'app-date-picker',
    templateUrl: './date-picker.html',
    styleUrls: ['./date-picker.css']
} )
export class DatePickerComponent {

    @Input() customDate:CustomDate;
    @Input() nome;
    @Input() legenda;
    @Input() obrigatorio : boolean;
    @Input() desabilitar : boolean;
    
    private dateActions: EventEmitter<string|MaterializeAction>;
    params;
    
    constructor( router: Router) {
        this.params = GlobalVariable.PARAMS_DATE;
        this.dateActions = new EventEmitter<string|MaterializeAction>();
    }
    
    readOnly(){        
        return false;
    }

    public openDatePicker(){
        this.dateActions.emit({action:"pickadate",params:["open"]});
    }
}