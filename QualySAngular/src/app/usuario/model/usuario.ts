/**
 * @description: Classe de Objeto de tranferecia ( TO ) de USUARIO 
 */
export class Usuario{

    public cpf   :string;
    public nome  :string;
    public email :string;
    public senha :string;
    public assinatura :string;
    public bloqueado  :boolean;

    /**
     * @constructor
     * @param {string } cpf   - Cpf do usuário ( chave primária )
     * @param {string } nome  - Nome do usuário
     * @param {string } email - E-mail do usuário
     * @param {string } senha - Senha do usuário
     * @param {string } assinatura - Diretório onde se encontra a imagem contendo assinatura do usuário.
     * @param {boolean} bloqueado  - Flag do cadastro, indicando se está ou não bloqueado.
     */
    constructor(cpf?:string  , nome?:string      , email?:string,
                senha?:string, assinatura?:string, bloqueado?:boolean,){
        
        this.cpf   = cpf;
        this.nome  = nome;
        this.email = email;
        this.senha = senha;
        this.assinatura = assinatura;
        this.bloqueado  = (bloqueado == null) ? false : bloqueado;
    }

    /**
     * @description: Retorna cpf do usuário
     * @return {string} ( cpf ) cpf do usuário
     */
    public getCpf():string{
        return this.cpf;
    }

    /**
     * @description: Retorna nome do usuário
     * @return {string} ( nome ) - nome do usuário
     */
    public getNome():string{
        return this.nome;
    }

    /**
     * @description Retorna email do usuário
     * @return {string} ( email ) - email do usuário
     */
    public getEmail():string{
        return this.email;
    }

    /**
     * @description Retorna senha do usuário
     * @return {string} ( senha ) - senha do usuário
     */
    public getSenha():string{
        return this.senha;
    }

    /**
     * @description Retorna diretório onde está assinatura do usuário.
     * @return {string} ( assinatura ) - Diretório onde está assinatura do usuário.
     */
    public getAssinatura():string{
        return this.assinatura;
    }

    /**
     * @description Retorna flag do cadastro, indicando se está ou não bloqueado.
     * @return {boolean} ( bloqueado ) - Flag do cadastro, indicando se está ou não bloqueado.
     */
    public isBloqueado():boolean{
        return this.bloqueado;
    }

    /**
     * @description: Seta cpf do usuário.
     * @param {string} cpf - cpf do usuário
     */
    public setCpf(cpf:string):void{
        this.cpf = cpf;
    }

    /**
     * @description Seta nome do usuário
     * @param {string} nome - nome do usuário
     */
    public setNome(nome:string):void{
        this.nome = nome;
    }

    /**
     * @description Seta email do usuário
     * @param {string} email - email do usuário
     */
    public setEmail(email:string):void{
        this.email = email;
    }

    /**
     * @description Seta senha do usuário.
     * @param senha - Senha do usuário
     */
    public setSenha(senha:string):void{
        this.senha = senha;
    }

    /**
     * @description Seta diretório onde se encontra imagem com assinatura do usuário.
     * @param assinatura - Diretório onde se encontra imagem com assinatura do usuário.
     */
    public setAssinatura(assinatura:string):void{
        this.assinatura = assinatura;
    }

    /**
     * @description Seta flag do cadastro, indicando se está ou não bloqueado.
     * @param {boolean} bloqueado flag do cadastro, indicando se está ou não bloqueado.
     */
    public setBloqueado(bloqueado:boolean):void {
        this.bloqueado = bloqueado;
    }
}