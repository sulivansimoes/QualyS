import { ItemFormulario } from './../../cadastro-formulario/model/item-formulario';

/**
 * @description : Classe de Objeto de tranferecia ( TO ) de Resposta de formulario.
 */
export class RespostaFormulario{

    public inconformes = [];

    private idCabecalho :number;
    private dataEmissao :String;
    private horaEmissao :String;
    private cpfUsuario  :String;
    private conforme    :boolean;
    private itens       :ItemFormulario[] = [];

    private nomeUsuario :String;


    /**
     * @constructor 
     * @param {number } idCabecalho  - Código identificador da resposta do formulário ( chave primária )
     * @param {String } dataEmissao  - Data em que o formulário foi respondido ( chave primária )
     * @param {String } horaEmissao  - Hora em que o formulário foi respondido ( chave primária )
     * @param {string } cpfUsuario   - Cpf do usuário que respondeu o formulário ( chave estrangeira ) 
     * @param {boolean} conforme     - Resposta do formulário. 
     * @param {ItemFormulario[]} itens  - Array de itens do formulário que devem ser respondidas
     */
    constructor(idCabecalho?:number, dataEmissao?: String, horaEmissao?:String,
                cpfUsuario?:String , conforme?:boolean   ,itens?:ItemFormulario[]){

        this.idCabecalho = idCabecalho;
        this.dataEmissao = dataEmissao;
        this.horaEmissao = horaEmissao;
        this.cpfUsuario  = cpfUsuario;
        this.conforme    = conforme;
        this.itens       = (itens ? itens : []);
    }
 
    /**
     * @description: Retorna código do id do cabeçalho referente a resposta do formulário.
     * @return {number} ( idCabecalho ) - código do formulário de resposta do formulário.
     */
    public getIdCabecalho(): number{
        return this.idCabecalho;
    }

    /**
     * @description: Retorna itens das perguntas do formulario.
     * @return {ItemFormulario} ( item ) - item da resposta do formulário.
     */
    public getItens():ItemFormulario[]{
        return this.itens;
    }

    /**
     * @description: Retorna data em que o formulário foi respondido
     * @return {String} ( dataEmissao ) - data em que o fomulário foi respondido.
     */
    public getDataEmissao(): String{
        return this.dataEmissao;
    }

    /**
     * @description: Retorna hora em que o formulário foi respondido.
     * @return {String} ( horaEmissao ) - hora em que formulário foi respondido.
     */
    public getHoraEmissao(): String{
        return this.horaEmissao;
    }

    /**
     * @description: Retorna cpf do usuário que resondeu formulário.
     * @return {String} ( cpfUsuario ) - cpf do usuário que resondeu formulário.
     */
    public getCpfUsuario():String{
        return this.cpfUsuario
    }


    /**
     * @description: Retorna nome do usuário que resondeu formulário.
     * @return {String} ( nomeUsuario ) - nome do usuário que resondeu formulário.
     */
    public getNomeusuario():String{
        return this.nomeUsuario
    }

    /**
     * @description: Retorna resposta do formulário (true) caso reposta for conforme, (false) caso contrário.
     * @return {boolean} ( conforme ) - resposta do formulário
     */
    public isConforme():boolean{
        return this.conforme;
    }

    /**
     * @description: Seta código identificador do código de cabeçalho referente à resposta do formulário.
     * @param {number} idCabecalho - código identificador do código de cabeçalho referente à resposta do formulário.
     */
    public setIdCabecalho(idCabecalho:number):void{
        this.idCabecalho = idCabecalho;
    }
    
    /**
     * @description: Seta código do item, referente a resposta do formulário.
     * @param {number} item - item, referente a resposta do formulário.
     */
    public addItem(item:ItemFormulario):void{
        this.itens.push( item );
    }


    /**
     * @description: Limpa array de itens, referente da resposta do formulário.
     * @return {void} 
     */
    public clearItens():void{
        this.itens = [];
    }


    /**
     * @description: Seta data da emissao em que formulário foi respondido.
     * @param {Date} dataEmissao - data da emissao em que formulário foi respondido.
     */
    public setDataEmissao(dataEmissao:String):void{
        this.dataEmissao = dataEmissao;
    }

    /**
     * @description: Seta hora da emissao em que formulário foi respondido.
     * @param {String} horaEmissao - hora da emissao em que formulário foi respondido.
     */
    public setHoraEmissao(horaEmissao:String){
        this.horaEmissao = horaEmissao;
    }

    /**
     * @description: Seta Cpf do usuário que respondeu o formulário.
     * @param {string} cpfUsuario - Cpf do usuário que respondeu o formulário.
     */
    public setCpfUsuario(cpfUsuario:string):void{
        this.cpfUsuario = cpfUsuario;
    }

    /**
     * @description Seta nome do usuário que respondeu o formulário.
     * @param {string} nomeUsuario - Nome do usuário que respondeu o formulário.
     */
    public setNomeUsuario(nomeUsuario:String){
        this.nomeUsuario = nomeUsuario;
    }    

    /**
     * @description: Seta reposta da pergunta do formulário.
     * @param {boolean} conforme - resposta da pergunta do formulário.
     */
    public setConforme(conforme:boolean):void{
        this.conforme = conforme;
    }



}