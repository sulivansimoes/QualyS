/**
 * @description : Classe de Objeto de tranferecia ( TO ) de FREQUENCIA 
 */
export class Frequencia{

    public id: number;
    public descricao: string;

    /**  
     * @constructor
     * @param {number} id - Código identificador da frequencia ( chave primária )
     * @param {string} descricao - Descrição da frequencia
     */
    constructor(id?:number, descricao?:string){
        this.id = id;
        this.descricao = descricao;
    }

    /**
     * @description: Retorna código do id da frequencia
     * @return {number} ( id ) - identificador da frequencia
     */
    public getId(): number{
        return this.id;
    }

    /**
     * @description: Retorna descricao do id da frequencia
     * @return {string} ( descricao ) - descricao da frequencia
     */
    public getDescricao(): string{
         return this.descricao;
    }

    /**
     * @description: Seta código da frequencia
     * @param {number} id - Código identificador da frequencia ( chave primária )
    */
    public setId(id:number):void{
        this.id = id;
    }

    /**
     * @description: Seta descricao da frequencia
     * @param {string} descricao - Descrição da frequencia
     */
    public setDescricao(descricao:string):void{
        this.descricao = descricao;
    } 
}