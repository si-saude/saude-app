export abstract class GenericComponent {
    protected showPreload: boolean;
    protected msgPreload: string;
    protected showConfirmSave: boolean;
    protected msgConfirmSave: string;
    protected goTo: string;
    protected colorError: string;
    protected msgError: string;
    protected verifyError: boolean = false;

    constructor() {
        this.showPreload = true;
        this.showConfirmSave = false;
        this.msgConfirmSave = "Salvo com sucesso! Ao confirmar, você será redirecionado para a tela de listagem.";
        this.msgPreload = "Aguarde processamento...";
    }
}