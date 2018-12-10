import { DateUtil } from './date.util';
import { Util } from './util';

export class CustomDate { 
    
    private dateUtil: DateUtil = new DateUtil();
    private apiDate: Date;
    private appDate: any;
    private apiTime: string;
    private appTime: string;

    constructor(apiDate:Date){
        this.setApiDate(apiDate);
    }

    getApiDate(){
        if(Util.isNotNull(this.appDate))
            this.apiDate = this.dateUtil.parseStringPtBrToDate(this.appDate,this.appTime);
         else
            this.apiDate = undefined;
        
        return this.apiDate;
    }
    
    setApiDate(date:Date){
        if(Util.isNotNull(date)){
            this.appDate = this.dateUtil.getDateStringDataUTC(date);
            this.appTime = this.dateUtil.getTimeStringDataUTC(date);
        }
        
        this.apiDate = date;
    }
    
    getAppDate(){ 
        return this.appDate;
    }
    
    getAppTime(){ 
        return this.appTime;
    }
    
    setAppDate(date:any){
        this.appDate = date;
        this.getApiDate();
    }    
    
    setAppTime(time :any){        
        this.appTime = time;
        this.getApiDate();
    }
}