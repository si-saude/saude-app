import * as moment from 'moment';

export class DateUtil {
    
    public getDateStringDataUTC(value) {
        if(value){
            let date : Date = new Date(this.removeUTCDate(value));          
            return date.toLocaleDateString('pt-br');     
        }
    }
    
    public removeUTCDate(value){        
        if((typeof value === 'string'))
        value = value.replace("[UTC]","");
        
        return value;
    }
    
    
    public getTimeStringDataUTC(value) {
        if(value){              
            let date : Date = new Date(this.removeUTCDate(value));
            return date.getHours().toString()+":"+ date.getMinutes();     
        }
    }
    
    public parseStringPtBrToDate(dataString ,timeString: string){
        
        let arrayDateString:Array<string> =  dataString.split("/");
        let dateAux:Date ;
        let arrayTimeString:Array<string> ;
        if(timeString != '' &&  timeString != undefined){
            arrayTimeString =  timeString.split(":");
            dateAux= new Date(Number(arrayDateString[2]), Number(arrayDateString[1])-1, Number(arrayDateString[0]),Number(arrayTimeString[0]), Number(arrayTimeString[1]), 0, 0);
        }else        
            dateAux = new Date(Number(arrayDateString[2]), Number(arrayDateString[1])-1, Number(arrayDateString[0]));       
    
        return dateAux;
   }
   
    
    public parseDataToObjectDatePicker( data ) {
        if ( data === undefined || data === null )
            return undefined;
        else if ( typeof data == 'object' ) {
            let d: Date = new Date(data)
            let o = Object.create( { date: { year: d.getFullYear(), month: d.getMonth()+1, day: d.getDate() } } );
            return o;
        }
        
        let s = data.split( "T" );
        let datas = s[0].split( "-" );
        
        if(datas.length == 1){
            datas = datas[0].split( "/" );            
            datas =  [ datas[2], datas[1], datas[0] ];
        }
        
        if ( datas[2].substring( 0, 1 ) == "0" ) {
            datas[2] = datas[2].replace( "0", "" );
        }
        if ( datas[1].substring( 0, 1 ) === "0" ) {
            datas[1] = datas[1].replace( "0", "" );
        }
        
        let o = Object.create( { date: { year: datas[0], month: datas[1], day: datas[2] } } );
        return o;
    }
    
    
 
    public parseDatePickerToDate( data ) {
        if ( data === undefined || data === null ) {
            return null;
        } else if ( data instanceof Date ) {
            return data;
        }
        let d: Date = new Date( data.date.year, data.date.month - 1, data.date.day );
        return d;
    }
    
    public parseDateToTime( data: Date ) {
        if ( data === undefined || data === null ) {
            return null;
        }
        let d: string = data.toString().split("T")[1].split("Z")[0].split(".")[0];
        d = (Number(d.split(":")[0])-3).toString()+":"+d.split(":")[1]+":"+d.split(":")[2];
        return d;
    }

    public parseDataToString( data ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.split( "T" );
        let datas = s[0].split( "-" );

        return datas[2] + "/" + datas[1] + "/" + datas[0];
    }

    public parseDateJavaToDateJS( data: Date ) {
        if ( data === undefined || data === null ) {
            return undefined;
        }
        let s = data.toString().split( "T" );
        s = s[0].split( "-" );
        let d: Date = new Date( s[0] + "-" + s[1] + "-" + s[2] );
        return d;
    }
    
    public verifyData( data ) { 
        if ( data != null && data != undefined )
            return true;
        else return false;
    }
    
    public transformDateToDateAgenda( date ) {
        let d;
        if ( typeof date == "string" ) {
             d = date.split(" ");
             date = d[0];
        }

        return date;
    }
    
    parseTimePickerToDate( date: Date, time: string ) {
        let t = time.split(":");
        let m = moment(date);
        m.hours(Number(t[0]));
        m.minutes(Number(t[1]));
        m.seconds(0);
        return m.toDate();
    }
    
    parseDateToObjectTimePicker(date) {
        let m;
        if ( typeof date == 'object') {
            return date.getHours()+":"+date.getMinutes();
        } else m = moment(date,"YYYY-MM-DDTHH:mm:ssZ[UTC]");
        
        return m.hours()+":"+m.minutes();
    }
    
    cloneDate(date: Date){        
        let d: Date = new Date();
        d.setDate(date.getDay());
        d.setHours(date.getHours());
        d.setMinutes(date.getMinutes());
        d.setSeconds(date.getSeconds());
    return d;      
    }
    
}