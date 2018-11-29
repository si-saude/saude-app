export class RiscoPotencialDto {
    private id: number;
    private ranking: number;
    private statusRPSat: string;
    private empregadoNome: string;
    private equipeResponsavelNome: string;
    private data: string;
    private status: string;
    private abreviacaoEquipeAcolhimento: string;
    private pendenciaEncerramento: boolean;
    private pendenciaValidacao: boolean;
    private pendenciaReavaliacao: boolean;
    
    getId() {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    getRanking() {
        return this.ranking;
    }
    setRanking(ranking: number) {
        this.ranking = ranking;
    }
    getStatusRPSat() {
        return this.statusRPSat;
    }
    setStatusRPSat(statusRPSat: string) {
        this.statusRPSat = statusRPSat;
    }
    getEmpregadoNome() {
        return this.empregadoNome;
    }
    setEmpregadoNome(empregadoNome: string) {
        this.empregadoNome = empregadoNome;
    }
    getEquipeResponsavelNome() {
        return this.equipeResponsavelNome;
    }
    setEquipeResponsavelNome(equipeResponsavelNome: string) {
        this.equipeResponsavelNome = equipeResponsavelNome;
    }
    getData() {
        return this.data;
    }
    setData(data: string) {
        this.data = data;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status: string) {
        this.status = status;
    }
    getAbreviacaoEquipeAcolhimento() {
        return this.abreviacaoEquipeAcolhimento;
    }
    setAbreviacaoEquipeAcolhimento(abreviacaoEquipeAcolhimento: string) {
        this.abreviacaoEquipeAcolhimento = abreviacaoEquipeAcolhimento;
    }
    getPendenciaEncerramento() {
        return this.pendenciaEncerramento;
    }
    setPendenciaEncerramento(pendenciaEncerramento: boolean) {
        this.pendenciaEncerramento = pendenciaEncerramento;
    }
    getPendenciaValidacao() {
        return this.pendenciaValidacao;
    }
    setPendenciaValidacao(pendenciaValidacao: boolean) {
        this.pendenciaValidacao = pendenciaValidacao;
    }
    getPendenciaReavaliacao() {
        return this.pendenciaReavaliacao;
    }
    setPendenciaReavaliacao(pendenciaReavaliacao: boolean) {
        this.pendenciaReavaliacao = pendenciaReavaliacao;
    }
}
