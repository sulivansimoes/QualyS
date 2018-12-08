import { Time } from "@angular/common";

/**
 * @description : Classe de Objeto de tranferecia ( TO ) de Resposta de formulario.
 */
export class RespostaFormulario{

    private idCabecalho :number;
    private item        :number;
    private dataEmissao :Date;
    private horaEmissao :Time;
    private cpfUsuario  :string;
    private conforme    :boolean;

    /**
     * @constructor 
     * @param {number } idCabecalho  - Código identificador da resposta do formulário ( chave primária )
     * @param {number } item         - Código identificador do item da resposta do formulário ( chave primária )
     * @param {Date   } dataEmissao  - Data em que o formulário foi respondido ( chave primária )
     * @param {Time   } horaEmissao  - Hora em que o formulário foi respondido ( chave primária )
     * @param {string } cpfUsuario   - Cpf do usuário que respondeu o formulário ( chave estrangeira ) 
     * @param {boolean} conforme     - Resposta do formulário. 
     */
    constructor(idCabecalho?:number, item?:number      , dataEmissao?: Date,
                horaEmissao?:Time  , cpfUsuario?:string, conforme?:boolean  ){

        this.idCabecalho = idCabecalho;
        this.item        = item;
        this.dataEmissao = dataEmissao;
        this.horaEmissao = horaEmissao;
        this.cpfUsuario  = cpfUsuario;
        this.conforme    = conforme;
    }
 
    /**
     * @description: Retorna código do id do cabeçalho referente a resposta do formulário.
     * @return {number} ( idCabecalho ) - código do formulário de resposta do formulário.
     */
    public getIdCabecalho(): number{
        return this.idCabecalho;
    }

    /**
     * @description: Retorna código do item da resposta do formulário.
     * @return {number} ( item ) - item da resposta do formulário.
     */
    public getItem():number{
        return this.item;
    }

    /**
     * @description: Retorna data em que o formulário foi respondido
     * @return {Date} ( dataEmissao ) - data em que o fomulário foi respondido.
     */
    public getDataEmissao(): Date{
        return this.dataEmissao;
    }

    /**
     * @description: Retorna hora em que o formulário foi respondido.
     * @return {Hora} ( horaEmissao ) - hora em que formulário foi respondido.
     */
    public getHoraEmissao(): Time{
        return this.horaEmissao;
    }

    /**
     * @description: Retorna cpf do usuário que resondeu formulário.
     * @return {string} ( cpfUsuario ) - cpf do usuário que resondeu formulário.
     */
    public getCpfUsuario():string{
        return this.cpfUsuario
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
     * @param {number} item - código do item, referente a resposta do formulário.
     */
    public setItem(item:number):void{
        this.item = item;
    }

    /**
     * @description: Seta data da emissao em que formulário foi respondido.
     * @param {Date} dataEmissao - data da emissao em que formulário foi respondido.
     */
    public setDataEmissao(dataEmissao:Date):void{
        this.dataEmissao = dataEmissao;
    }

    /**
     * @description: Seta hora da emissao em que formulário foi respondido.
     * @param {Time} horaEmissao - hora da emissao em que formulário foi respondido.
     */
    public setHoraEmissao(horaEmissao:Time){
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
     * @description: Seta reposta da pergunta do formulário.
     * @param {boolean} conforme - resposta da pergunta do formulário.
     */
    public setConforme(conforme:boolean):void{
        this.conforme = conforme;
    }
}