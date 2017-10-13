import { IMyDpOptions } from 'mydatepicker'; 
import { Subscription } from 'rxjs/Rx';

import { GenericService } from './generic.service';
import { GlobalVariable } from './../global';

export abstract class GenericFormComponent<T> {

    colorMsg: string;
    msg: string;
    verifyMsg: boolean = false;
    titulo: string;
    corTitulo: string = GlobalVariable.COLOR_TITLE;
    inscricao: Subscription;

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy'
    };
    

    constructor(protected service: GenericService){}
    
    isValid() {
//        if ( this.formulario.valid ) {
//            return true;
//        } else { return false; }
    }
    
    save(object: T) {
        this.service.submit( object )
            .then( res => {
                this.processReturn(true,res);
            } )
            .catch( error => {
                this.processReturn(false,error);
            } )
    }
    
    processReturn(sucess:boolean, res:any){
        if(sucess){
            this.verifyMsg = true;
            this.colorMsg = "green";
            this.msg = res.text();
        }else{
            this.verifyMsg = true;
            this.colorMsg = "red";
            this.msg = res.text();
        }
    }
    
    parseDataToObjectDatePicker(data) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split("T");
        let datas = s[0].split("-");
        if ( datas[2].substring(0,1) === "0" ) {
            datas[2] = datas[2].replace("0", "");
        }
        let o = Object.create({date: { year: datas[0], month: datas[1], day: datas[2] }});
        return o;   
    }
        
    parseDatePickerToDate(data) {
        if (data === undefined || data === null) {
            return null;
        } else if (data instanceof Date) {
            return data;
        }   
        let d: Date = new Date(data.date.year, data.date.month - 1, data.date.day);
        return d;
    }

}