import { Time } from '@angular/common';
/**
 * @description: Classe de Objeto de tranferecia ( TO ) de INCONFORME 
 */
export class Inconforme{

    private id             :number;
    private item           :number;
    private dataEmissao    :Date;
    private horaEmissao    :Time;
    private descInconforme :string;
    private dataCorrecao   :Date;
    private acaoCorretiva  :string;
    private cpfUsuario     :string;

    /**
     * @constructor
     * @param {number} id            - Código identificador do programa ( chave primária )
     * @param {number} item          - Código identificador do item da resposta do formulário que está em inconforme ( chave primária )
     * @param {Date  } dataEmissao   - Data em que inconforme foi gerado ( chave primária )
     * @param {Time  } horaEmissao   - Hora em que inconforme foi gerado ( chave primária )
     * @param {string} descInconforme- Descrição do inconforme em questão.
     * @param {Date  } dataCorrecao  - Data em que correção do inconforme feita.
     * @param {string} acaoCorretiva - Ação tomada para corrigir inconformidade.
     * @param {string} cpfUsuario    - Cpf do usuário que apontou correção da inconformidade.
     */
    constructor(id?:number            , item?:number      , dataEmissao?:Date    , horaEmissao?:Time,
                descInconforme?:string, dataCorrecao?:Date, acaoCorretiva?:string, cpfUsuario?:string){

        this.id             = id;
        this.item           = item;
        this.dataEmissao    = dataEmissao;
        this.horaEmissao    = horaEmissao;
        this.descInconforme = descInconforme;
        this.dataCorrecao   = dataCorrecao;
        this.acaoCorretiva  = acaoCorretiva;
        this.cpfUsuario     = cpfUsuario;
    }

    /**
     * @description: Retorna id ( código identificador ) do inconforme.
     * @return {number} ( id ) - id ( código identificador ) do inconforme.
     */
    public getId():number{
        return this.id;
    }

    /**
     * @description: Retorna item do formulário que se encontra em inconforme. 
     * @return {number} ( item ) - Código identificador do item da resposta do formulário que está em inconforme 
     */
    public getItem():number{
        return this.item
    }

    /**
     * @description: Retorna data em que inconforme foi gerado.
     * @return {Date} ( dataEmissao ) - Data em que inconforme foi gerado.
     */
    public getDataEmissao():Date{
        return this.dataEmissao;
    }

    /**
     * @description: Retorna hora em que inconforme foi gerado.
     * @return {Time} ( horaEmissao ) - Retorna data em que inconforme foi gerado.
     */
    public getHoraEmissao():Time{
        return this.horaEmissao;
    }

    /**
     * @description: Retorna descricao do inconforme
     * @return {string} ( descInforme ) - descricao do inconforme
     */
    public getDescricaoInconforme():string{
        return this.descInconforme
    }

    /**
     * @description Retorna data em que inconformidade foi corrigida.
     * @return {Date} ( dataCorrecao ) - Data em que inconformidade foi corrigida.
     */
    public getDataCorrecao():Date{
        return this.dataCorrecao;
    }

    /**
     * @description Retorna acao corretiva que foi tomada para corrigir inconforme.
     * @return {string} ( acaoCorretiva ) - acao corretiva que foi tomada para corrigir inconforme.
     */
    public getAcaoCorretiva():string{
        return this.acaoCorretiva;
    }

    /**
     * @description:Retorna cpf do usuário que apontou correção da inconformidade.
     * @return {string} ( cpfUsuario ) - cpf do usuário que apontou correção da inconformidade.
     */
    public getCpfUsuario():string{
        return this.cpfUsuario;
    }

    /**
     * @description: Seta conteudo do id da incoformidade.
     * @param {number} id - id da inconformidade.
     */
    public setId(id:number):void{
        this.id = id;
    }

    /**
     * @description: Seta conteudo do item da incoformidade.
     * @param {number} item - item da incoformidade.
     */
    public setItem(item:number):void{
        this.item = item;
    }

    /**
     * @description Seta conteudo em que data da emissao da inconformidade foi gerada.
     * @param {Date} dataEmissao - data da emissao da inconformidade
     */
    public setDataEmissao(dataEmissao:Date):void{
        this.dataEmissao = dataEmissao;
    }

    /**
     * @description Seta conteudo da hora em que informidade foi gerada.
     * @param {Time} horaEmissao hora em que informidade foi gerada.
     */
    public setHoraEmissao(horaEmissao:Time):void{
        this.horaEmissao = horaEmissao;
    }

    /**
     * @description Seta conteudo da descrição da inconformidade.
     * @param {string} descInconforme - descrição da inconformidade.
     */
    public setDescricaoInconforme(descInconforme:string):void{
        this.descInconforme = descInconforme;
    }

    /**
     * @description Seta conteudo da data em que inconformidade foi corrigida.
     * @param {Date} dataCorrecao - Data em que inconformidade foi corrigida.
     */
    public setDataCorrecao(dataCorrecao:Date):void{
        this.dataCorrecao = dataCorrecao;
    }

    /**
     * @description Seta conteudo da acao corretiva da inconformidade.
     * @param {string} acaoCorretiva - Acao corretiva da inconformidade.
     */
    public setAcaoCorretiva(acaoCorretiva:string):void{
        this.acaoCorretiva = acaoCorretiva;
    }

    /**
     * @description Retorna o cpf do usuário que apontou correção da inconformidade.
     * @param {string} cpfUsuario - Cpf do usuário que apontou correção da inconformidade.
     */
    public setCpfUsuario(cpfUsuario:string):void{
        this.cpfUsuario = cpfUsuario;
    }
}