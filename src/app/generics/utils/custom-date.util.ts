import { DateUtil } from './date.util';

export class CustomDate {
    
    private dateUtil: DateUtil = new DateUtil();
    private apiDate: Date;
    private appDate: any;

    constructor(apiDate:Date){
        this.setApiDate(apiDate);
    }

    getApiDate(){
        
        if( this.appDate !== null && this.appDate !== undefined )
            this.apiDate = this.dateUtil.parseDatePickerToDate(this.appDate);
        
        return this.apiDate;
    }
    
    setApiDate(date:Date){
        
        if(date !== null && date !== undefined)
            this.appDate = this.dateUtil.parseDataToObjectDatePicker(date);
        
        this.apiDate = date;
    }
    
    getAppDate(){
        if(this.apiDate !== null && this.apiDate !== undefined)
            this.appDate = this.dateUtil.parseDataToObjectDatePicker(this.apiDate.toLocaleDateString());
        
        return this.appDate;
    }
    
    setAppDate(date:any){
        if( date !== null && date !== undefined )
            this.apiDate = this.dateUtil.parseDatePickerToDate(date);
        
        this.appDate = date;
    }
}