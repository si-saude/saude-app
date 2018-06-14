import { CustomDate} from './../generics/utils/custom-date.util';

export class Feriado {
    private id: number;
    private titulo:string;
    private data:Date;
    private version: number;

    private dataCustomDate: CustomDate = new CustomDate(this.data);

    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getVersion(): number {
        return this.version;
    }
    
    setVersion(version: number) {
        this.version = version;
    }
    
    getTitulo():string{
        return this.titulo;
    }
    
    setTitulo(titulo:string){
        this.titulo = titulo;
    }
    
    getData() {
        this.data = this.dataCustomDate.getApiDate();
        return this.data;
    }
    
    setData(data: Date) {
        this.dataCustomDate.setApiDate(data);
        this.data = data;
    }
    
    getDataCustomDate(){
        return this.dataCustomDate;
    }
    
    setDataCustomDate(dataCustomDate: CustomDate){
        this.dataCustomDate = dataCustomDate;
    }
}