export class Feriado {
    private id: number;
    private titulo:string;
    private data:Date;
    private version: number;

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
    
    getData():Date{
        return this.data;
    }
    
    setData(d: Date){
        this.data = d;
    }
}