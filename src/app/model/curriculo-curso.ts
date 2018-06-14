import { Curso } from './curso';
import { Curriculo } from './curriculo';
import { CustomDate} from './../generics/utils/custom-date.util';

export class CurriculoCurso {
    private id: number = 0;
    private curriculo: Curriculo;
    private curso: Curso;
    private data: Date;
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
    
    getCurriculo(): Curriculo{
        return this.curriculo;
    }
    
    setCurriculo(curriculo: Curriculo){
        this.curriculo = curriculo;
    }
    
    getCurso(): Curso{
        return this.curso;
    }
    
    setCurso(curso: Curso){
        this.curso = curso;
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

