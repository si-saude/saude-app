export class Criterio {
    private id: number = 0;
    private nome: string;
    private operador: string = "";
    private tipo: string = "";
    private valor: string = "";
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

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string) {
        this.nome = nome;
    }

    getOperador():string{
        return this.operador;
    }
    
    setOperador(operador:string){
        this.operador = operador;
    }
    
    getTipo():string{
        return this.tipo;
    }
    
    setTipo(tipo: string){
        this.tipo = tipo;
    }
    
    getValor():string{
        return this.valor;
    }
    
    setValor(valor: string){
        this.valor = valor;
    }
}