import { IMyDpOptions } from 'mydatepicker'; 
import { Subscription } from 'rxjs/Rx';

import { GenericService } from './generic.service';
import { GenericComponent } from './generic.component';
import { GlobalVariable } from './../global';

export abstract class GenericFormComponent<T> extends GenericComponent {
//    colorError: string;
//    msgError: string;
//    verifyError: boolean = false;
    titulo: string;
    corTitulo: string = GlobalVariable.COLOR_TITLE;
    inscricao: Subscription;
    protected showPreload: boolean;

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy'
    };
    
    constructor(protected service: GenericService){
        super();
        this.showPreload = false;
        this.showConfirmSave = false;
    }
    
    isValid() {
//        if ( this.formulario.valid ) {
//            return true;
//        } else { return false; }
    }
    
    save(object: T) {
        this.showPreload = true;
        this.service.submit( object )
            .then( res => {
                this.processReturn(true,res);
            } )
            .catch( error => {
                this.processReturn(false,error);
            } )
    }
    
    processReturn(sucess:boolean, res:any){
        if(sucess) {
            this.msgConfirmSave = res.text();
            this.showConfirmSave = true;
        }else{
            this.verifyError = true;
            this.colorError = "red";
            this.msgError = res.text();
        }
        this.showPreload = false;
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
    
    parseDataToString(data) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split("T");
        let datas = s[0].split("-");
        
        
        return datas[2] + "/" + datas[1] + "/" + datas[0];   
    }

}