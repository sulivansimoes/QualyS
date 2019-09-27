/**
 * @description: Classe de Objeto de tranferecia ( TO ) de USUARIO 
 */
export class Usuario{

    public cpf   :string;
    public nome  :string;
    public email :string;
    public senha :string;
    public assinatura :String;
    public bloqueado  :boolean;
    public perfil:number;

    /**
     * @constructor
     * @param {string } cpf   - Cpf do usuário ( chave primária )
     * @param {string } nome  - Nome do usuário
     * @param {string } email - E-mail do usuário
     * @param {string } senha - Senha do usuário
     * @param {String } assinatura - Imagem encriptada em base64 da assinatura do usuário.
     * @param {boolean} bloqueado  - Flag do cadastro, indicando se está ou não bloqueado.
     * @param {perfil } perfil - Informe o perfil (nivel de acesso) que o usuário possui.
     */
    constructor(cpf?:string  , nome?:string        , email?:string,
                senha?:string, assinatura?:String, bloqueado?:boolean, perfil?:number){
        
        this.cpf   = cpf;
        this.nome  = nome;
        this.email = email;
        this.senha = senha;
        this.assinatura = assinatura;
        this.bloqueado  = (bloqueado == null) ? false : bloqueado;
        this.perfil = perfil;
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
     * @description Retorna Imagem de assinatura do usuário.
     * @return {String} ( assinatura ) - Imagem de assinatura do usuário encriptada em base64.
     */
    public getAssinatura():String{
        return this.assinatura;
    }

    /**
     * @description Retorna o perfil do usuário
     * @return {number} ( perfil ) - perfil do usuário  
     */
    public getPerfil(){
        return this.perfil;
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
     * @description Seta Imagem com assinatura do usuário encriptada em base64.
     * @param assinatura - String da Imagem encriptada em base64 com assinatura do usuário.
     */
    public setAssinatura(assinatura:String):void{
        this.assinatura = assinatura;
    }

    /**
     * @description Seta flag do cadastro, indicando se está ou não bloqueado.
     * @param {boolean} bloqueado flag do cadastro, indicando se está ou não bloqueado.
     */
    public setBloqueado(bloqueado:boolean):void {
        this.bloqueado = bloqueado;
    }

    /**
     * @description Seta perfil do usuário.
     * @param {number} perfil - numero indicando perfil do usuário de 1 a 4
     */
    public setPerfil(perfil):void{
        this.perfil = perfil;
    }

}