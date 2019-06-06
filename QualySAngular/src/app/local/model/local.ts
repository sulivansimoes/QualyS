/**
 * @description: Classe de Objeto de tranferecia ( TO ) de LOCAL 
 */
export class Local{

    private id: number;
    private descricao: string;
    private bloqueado: boolean;

    /**  
    * @constructor
    * @param {number } id - Código identificador do local ( chave primária )
    * @param {string } descricao - Descrição do local
    * @param {boolean} bloqueado - Flag do cadastro, indicando se está ou não bloqueado.
    */
    constructor(id?:number, descricao?:string, bloqueado?:boolean){
        this.id = id;
        this.descricao = descricao;
        this.bloqueado = (bloqueado == null) ? false : bloqueado;
    }

    /**
     * @description: Retorna código do id do local
     * @return {number} ( id ) - identificador do local
     */
    public getId(): number{
        return this.id;
    }

    /**
     * @description: Retorna descricao do id do local
     * @return {string} ( descricao ) - descricao do local
     */
    public getDescricao(): string{
        return this.descricao;
    }

    /**
     * @description: Retorna status ( flag ) de bloqueio do local
     * @return {boolean} ( status ) - status do local
     */
    public isBloqueado(): boolean{
        return this.bloqueado;
    }

    /**
    * @description: Seta código do local
    * @param {number} id - Código identificador do local ( chave primária )
    */
    public setId(id:number):void{
        this.id = id;
    }

    /**
    * @description: Seta descricao do local
    * @param {string} descricao - Descrição do local
    */
    public setDescricao(descricao:string):void{
        this.descricao = descricao;
    } 

    /**
    * @description: Seta status do local
    * @param {boolean} status - Flag do cadastro, indicando se está ou não bloqueado.
    */
    public setBloqueado(status:boolean):void{
        this.bloqueado = status;
    }

} 