
export class Exame{
    private id: number;
    private version: number;
    private codigo: string;
    private descricao: string;

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
    
    getCodigo():string{
        return this.codigo;
    }
    
    setCodigo(codigo:string){
        this.codigo = codigo;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
}