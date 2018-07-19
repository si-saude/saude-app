import { DateUtil } from './date.util';

export class CustomTime {
    
    private dateUtil: DateUtil = new DateUtil();
    private apiDate: Date;
    private appDate: any;
    private appTime: string;

    constructor(apiDate:Date){
        this.setApiDate(apiDate);
        
    }

    getApiDate(){
        if( this.appDate !== null && this.appDate !== undefined ) {
            this.apiDate = this.dateUtil.parseDatePickerToDate(this.appDate);
            this.apiDate = this.dateUtil.parseTimePickerToDate(this.apiDate, this.appTime);
        }
        else
            this.apiDate = undefined;
        
        return this.apiDate;
    }
    
    setApiDate(date:Date){
        if(date !== null && date !== undefined) {
            this.appDate = this.dateUtil.parseDataToObjectDatePicker(date);
            this.appTime = this.dateUtil.parseDateToObjectTimePicker(date);
        } else this.appTime = "00:00";
        this.apiDate = date;
    }
    
    getAppDate(){
        if(this.apiDate !== null && this.apiDate !== undefined)
            this.appDate = this.dateUtil.parseDataToObjectDatePicker(this.apiDate.toLocaleDateString());
        
        return this.appDate;
    }
    
    setAppDate(date:any){
        if( date !== null && date !== undefined ) {
            this.apiDate = this.dateUtil.parseDatePickerToDate(date);
            this.apiDate = this.dateUtil.parseTimePickerToDate(this.apiDate, this.appTime);
        }
        
        this.appDate = date;
    }
        
}