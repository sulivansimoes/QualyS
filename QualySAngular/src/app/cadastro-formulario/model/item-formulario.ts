/**
 * @description : Classe de Objeto de tranferecia ( TO ) de ITEM-FORMULARIO 
 */
export class ItemFormulario {

    private idCabecalho: number;
    private item: number;
    private pergunta: string;
    private item_bloqueado: boolean;

    /**
     * @constructor 
     * @param {number } idCabecalho - Código identificador do cabecalho da pergunta ( chave primária/estrangeira )
     * @param {number } item        - Código idententificador do item da pergunta ( chave primária )
     * @param {string } pergunta    - Pergunta do formulário, que será respondida posteriormente.
     * @param {boolean} item_bloqueado   - Flag do cadastro, indicando se item está ou não bloqueado. 
     */
    constructor(idCabecalho?: number, item?: number, pergunta?: string, item_bloqueado?: boolean) {

        this.idCabecalho = idCabecalho;
        this.item        = item;
        this.pergunta    = pergunta;
        this.item_bloqueado   = (item_bloqueado == null) ? false : item_bloqueado;
    }

    /**
     * @description: Retorna código do id do cabecalho do formulário 
     * @return {number} ( idCabecalho ) - identificador do cabecalho
     */
    public getIdCabecalho():number{
        return this.idCabecalho;
    }

    /**
     * @description: Retorna código do id do item
     * @return {number} ( item ) - item do formulário
     */
    public getItem():number{
        return this.item;
    }

    /**
     * @description: Retorna a pergunta do formulário
     * @return {string} ( pergunta ) - pergunta do formulário
     */
    public getPergunta():string{
        return this.pergunta;
    }

    /**
     * @description: Retorna status ( flag ) de bloqueio do item do formulário
     * @return {boolean} ( status ) - status do item do formulário
     */
    public isBloqueado(): boolean{
        return this.item_bloqueado;
    }

    /**
     * @description: Seta código do id do cabecalho do formulário 
     * @param {number} idCabecalho - código do id do cabecalho do formulário
     */
    public setIdCabecalho(idCabecalho:number):void{
        this.idCabecalho = idCabecalho;
    }

    /**
     * @description: Seta código do item ( pergunta ) do formulário
     * @param {number} item - código do item ( pergunta ) do formulário
     */
    public setItem(item:number):void{
        this.item = item;
    }

    /**
     * @description: Seta pergunta do formulário.
     * @param {string} pergunta - pergunta do formulário
     */
    public setPergunta(pergunta:string):void{
        this.pergunta = pergunta;
    }

   /**
    * @description: Seta status do item do formulário
    * @param {boolean} status - Flag do cadastro, indicando se está ou não bloqueado.
    */
   public setBloqueado(status:boolean):void{
    this.item_bloqueado = status;
   }
}