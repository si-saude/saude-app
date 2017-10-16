export class Gerencia {
    private id: number = 0;
    private codigo: string;
    private codigoCompleto: string;
    private descricao: string;
    private gerencia: Gerencia;
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
    
    getCodigo():string{
        return this.codigo;
    }
    
    setCodigo(codigo:string){
        this.codigo = codigo;
    }
    
    getCodigoCompleto():string{
        return this.codigoCompleto;
    }
    
    setCodigoCompleto(cC:string){
        this.codigoCompleto = cC;
    }
    
    getDescricao():string{
        return this.descricao;
    }
    
    setDescricao(descricao:string){
        this.descricao = descricao;
    }
    
    getGerencia():Gerencia{
        return this.gerencia;
    }
    
    setGerencia(g:Gerencia){
        this.gerencia = g;
    }
}