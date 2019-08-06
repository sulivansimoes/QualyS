import { Time } from '@angular/common';

/**
 * @description: Classe de Objeto de tranferecia ( TO ) de INCONFORME 
 */
export class Inconforme{

    private id_cadastro_formulario:number;
    private descricao_formulario  :String;
    private item           :number;
    private pergunta       :String;
    private emissao        :String;
    private hora           :Time;
    private descricao_inconforme :String;
    private data_correcao  :String;
    private acao_corretiva :String;
    private cpf_usuario    :String;

    /**
     * @constructor
     * @param {number} id_cadastro_formulario - Código identificador do formulário ( chave primária )
     * @param {String} descricao_formulario   - Descrição do formulário
     * @param {number} item          - Código identificador do item da resposta do formulário que está em inconforme ( chave primária )
     * @param {String} data_emissao  - Data em que inconforme foi gerado ( chave primária )
     * @param {Time  } hora_emissao  - Hora em que inconforme foi gerado ( chave primária )
     * @param {string} descricao_inconforme - Descrição do inconforme em questão.
     * @param {String} data_correcao - Data em que correção do inconforme feita.
     * @param {string} acaoCorretiva - Ação tomada para corrigir inconformidade.
     * @param {string} cpfUsuario    - Cpf do usuário que apontou correção da inconformidade.
     */
    constructor(id_cadastro_formulario?:number, descricao_formulario?:String, item?:number         ,
                pergunta?:String              , data_emissao?:String        , hora_emissao?:Time   ,
                descricao_inconforme?:string  , data_correcao?:String       , acaoCorretiva?:string, cpfUsuario?:string){

        this.id_cadastro_formulario = id_cadastro_formulario;
        this.descricao_formulario   = descricao_formulario;
        this.item                   = item;
        this.pergunta               = pergunta;
        this.emissao                = data_emissao;
        this.hora                   = hora_emissao;
        this.descricao_inconforme   = descricao_inconforme;
        this.data_correcao          = data_correcao;
        this.acao_corretiva         = acaoCorretiva;
        this.cpf_usuario            = cpfUsuario;
    }

    /**
     * @description: Retorna id ( código identificador ) do inconforme.
     * @return {number} ( id ) - id ( código identificador ) do inconforme.
     */
    public getIdFormulario():number{
        return this.id_cadastro_formulario;
    }

    /**
     * @description: Retorna descricao formulario 
     * @return {String} ( descricao_formulario ) - descricao do formulario que gerou o inconforme
     */
    public getDescricaoFormulario():String{
        return this.descricao_formulario;
    }    

    /**
     * @description: Retorna item do formulário que se encontra em inconforme. 
     * @return {number} ( item ) - Código identificador do item da resposta do formulário que está em inconforme 
     */
    public getItem():number{
        return this.item
    }

    /**
     * @description: Retorna pergunta do formulário que se encontra em inconforme. 
     * @return {String} ( pergunta ) - perguta do item da resposta do formulário que está em inconforme 
     */
    public getPergunta():String{
        return this.pergunta;
    }    

    /**
     * @description: Retorna data em que inconforme foi gerado.
     * @return {String} ( dataEmissao ) - Data em que inconforme foi gerado.
     */
    public getDataEmissao():String{
        return this.emissao;
    }

    /**
     * @description: Retorna hora em que inconforme foi gerado.
     * @return {Time} ( horaEmissao ) - Retorna data em que inconforme foi gerado.
     */
    public getHoraEmissao():Time{
        return this.hora;
    }

    /**
     * @description: Retorna descricao do inconforme
     * @return {string} ( descInforme ) - descricao do inconforme
     */
    public getDescricaoInconforme():String{
        return this.descricao_inconforme
    }

    /**
     * @description Retorna data em que inconformidade foi corrigida.
     * @return {String} ( dataCorrecao ) - Data em que inconformidade foi corrigida.
     */
    public getDataCorrecao():String{
        return this.data_correcao;
    }

    /**
     * @description Retorna acao corretiva que foi tomada para corrigir inconforme.
     * @return {string} ( acaoCorretiva ) - acao corretiva que foi tomada para corrigir inconforme.
     */
    public getAcaoCorretiva():String{
        return this.acao_corretiva;
    }

    /**
     * @description:Retorna cpf do usuário que apontou correção da inconformidade.
     * @return {string} ( cpfUsuario ) - cpf do usuário que apontou correção da inconformidade.
     */
    public getCpfUsuario():String{
        return this.cpf_usuario;
    }

    /**
     * @description: Seta conteudo do id da incoformidade.
     * @param {number} id - id da inconformidade.
     */
    public setIdFormulario(id:number):void{
        this.id_cadastro_formulario = id;
    }

    /**
     * @description: Retorna descricao formulario 
     * @param {String} descricao_formulario  - descricao do formulario que gerou o inconforme
     */
    public setDescricaoFormulario(descricaoFormulario:String):void{
        this.descricao_formulario =  descricaoFormulario;
    }       

    /**
     * @description: Seta conteudo do item da incoformidade.
     * @param {number} item - item da incoformidade.
     */
    public setItem(item:number):void{
        this.item = item;
    }

    /**
     * @description: Seta pergunta do formulário que se encontra em inconforme. 
     * @param {String} ( pergunta ) - perguta do item da resposta do formulário que está em inconforme 
     */
    public setPergunta(pergunta:String):void{
        this.pergunta =  pergunta;
    } 

    /**
     * @description Seta conteudo em que data da emissao da inconformidade foi gerada.
     * @param {String} dataEmissao - data da emissao da inconformidade
     */
    public setDataEmissao(dataEmissao:String):void{
        this.emissao = dataEmissao;
    }

    /**
     * @description Seta conteudo da hora em que informidade foi gerada.
     * @param {Time} horaEmissao hora em que informidade foi gerada.
     */
    public setHoraEmissao(horaEmissao:Time):void{
        this.hora = horaEmissao;
    }

    /**
     * @description Seta conteudo da descrição da inconformidade.
     * @param {string} descInconforme - descrição da inconformidade.
     */
    public setDescricaoInconforme(descInconforme:string):void{
        this.descricao_inconforme = descInconforme;
    }

    /**
     * @description Seta conteudo da data em que inconformidade foi corrigida.
     * @param {String} dataCorrecao - Data em que inconformidade foi corrigida.
     */
    public setDataCorrecao(dataCorrecao:String):void{
        this.data_correcao = dataCorrecao;
    }

    /**
     * @description Seta conteudo da acao corretiva da inconformidade.
     * @param {string} acaoCorretiva - Acao corretiva da inconformidade.
     */
    public setAcaoCorretiva(acaoCorretiva:string):void{
        this.acao_corretiva = acaoCorretiva;
    }

    /**
     * @description Retorna o cpf do usuário que apontou correção da inconformidade.
     * @param {string} cpfUsuario - Cpf do usuário que apontou correção da inconformidade.
     */
    public setCpfUsuario(cpfUsuario:string):void{
        this.cpf_usuario = cpfUsuario;
    }
}