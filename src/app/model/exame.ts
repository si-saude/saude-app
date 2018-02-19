import { CampoExame } from './campo-exame';

export class Exame{
    private id: number = 0;
    private version: number;
    private codigo: string;
    private descricao: string;
    private ordem: number;
    private campoExames: Array<CampoExame>;

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
    
    getOrdem():number{
        return this.ordem;
    }
    
    setOrdem(ordem:number){
        this.ordem = ordem;
    }
    
    getCampoExames(): Array<CampoExame>{
        return this.campoExames;
    }
    
    setCampoExames(campoExames: Array<CampoExame>){
        this.campoExames = campoExames;
    }
}