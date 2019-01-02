import { ItemFormulario } from './item-formulario';

/**
 * @description : Classe de Objeto de tranferecia ( TO ) do CADASTRO-FORMULARIO 
 */
 export class CadastroFormulario{

    private id         : number;
    private descricao  : string;
    private idPrograma : number;
    private idLocal    : number;
    private itens      : ItemFormulario[];
    private bloqueado  : boolean;
    
    /**
     * @constructor
     * @param {number } id         - Código identificador do cabecalho da pergunta ( chave primária )
     * @param {string } descricao  - Descrição do formulário de perguntas.
     * @param {number } idPrograma - Id do programa que está atrelado ao formulário ( chave estrangeira )
     * @param {number } idLocal    - Id do local onde o formulário de perguntas será aplicado. ( chave estrangeira )
     * @param {Array  } itens      - Itens que compõe o formulário de perguntas.
     * @param {boilean} bloqueado  - Flag do cadastro, indicando se item está ou não bloqueado. 
     */
    constructor(id?:number              , descricao?:string , idPrograma?:number, idLocal?:number,
                itens?: ItemFormulario[], bloqueado?:boolean){

        this.id         = id;
        this.descricao  = descricao;
        this.idPrograma = idPrograma;
        this.idLocal    = idLocal;
        this.itens      = (itens == null) ? [] :itens;
        this.bloqueado  = (bloqueado == null) ? false : bloqueado;
    }

    /**
     * @description: Retorna código do id do formulário 
     * @return {number} ( id ) - identificador do formulário
     */
    public getId():number{
        return this.id;
    }

    /**
     * @description: Retorna descrição do cadastro do formulário 
     * @return {string} ( descrição ) - descrição do formulário
     */
    public getDescricao():string{
        return this.descricao;
    }

    /**
     * @description: Retorna código identificador do Programa que este formulário está atrelado.
     * @return {number} ( idPrograma ) - código identificador do Programa que este formulário está atrelado.
     */
    public getIdPrograma():number{
        return this.idPrograma;
    }

    /**
     * @description: Retorna código identificador do local, onde o formulário de perguntas será aplicado.
     * @return {number} ( idLocal ) - código identificador do local.
     */
    public getLocal():number{
        return this.idLocal;
    }

    /**
     * @description: Retorna itens que compões o formulário de perguntas.
     * @return {Array} ( itens ) - itens que compõem o formulário.
     */
    public getItens():ItemFormulario[]{
        return this.itens;
    }

    /**
     * @description: Retorna item especifico que compões o formulário de perguntas.
     * @param  {number} item - código do item cuja as informações são para ser retornadas.
     * @return {ItemFormulario } ( item ) - item que compõe o formulário, caso o item não exista retorna null.
     */
    public getItem(item:number):ItemFormulario{

        return this.getItens().find( i => i.getItem() == item );
    }

    /**
     * @description: Retorna status ( flag ) de bloqueio do cadastro do formulário
     * @return {boolean} ( status ) - status do cadastro do formulário
     */
    public isBloqueado(): boolean{
        return this.bloqueado;
    }

    /**
     * @description: Seta código do id do formulário 
     * @param {number} id - código do id do formulário 
     */
    public setId(id:number):void{
        this.id = id;
    }

    /**
     * @description: Seta descrição do formulário de perguntas
     * @param {string} descricao - Descrição do formulário de perguntas.
     */
    public setDescricao(descricao:string):void{
        this.descricao = descricao;
    }

    /**
     * @description Seta código identicador do programa que este formulário está atrelado.
     * @param idPrograma - Código identicador do programa que este formulário está atrelado.
     */
    public setIdPrograma(idPrograma:number):void{
        this.idPrograma = idPrograma;
    }

    /**
     * @description Seta código identificador do local que este formulário está atrelado.
     * @param idLocal - código identificador do local que este formulário está atrelado.
     */
    public setIdLocal(idLocal:number):void{
        this.idLocal = idLocal;
    }

    /**
     * @description: Seta status do cadastro do formulário.
     * @param {boolean} status - Flag do cadastro, indicando se está ou não bloqueado.
     */
    public setBloqueado(status:boolean):void{
        this.bloqueado = status;
    }

    /**
     * @description: Retorna a quantidade de itens que o formulario possui
     * @return {number} ( quantidadeItens ) - número referente a quantidade de itens que o formulário possui 
     */
    public getQuantidadeItens():number{
        return this.getItens().length;
    }

    /**
     * @description: Adicona vários itens de uma única vez na lista de itens do formulário
     * @param {Array} itens - itens que compões o formulário de perguntas
     * @obs Caso for adicionar um único item, use o addItem() para melhor performance.
     */
    public addItens(itens:ItemFormulario[]):void{

        if(this.getItens().length > 0 ){
            for(let item of itens){
                 this.addItem(item);
            }
        }else{
            this.itens = itens;
        }
    }

    /**
     * @description: Adiciona um item à coleção de itens do formulário. 
     * @param {ItemFormulario} item - item que será inserido na lista de itens.
     */
    public addItem(item:ItemFormulario):void{
        this.getItens().push(item);
    }

    /**
     * @description: Remove um item da coleção de itens do formulário. 
     * @param {ItemFormulario} item - item que será removido na lista de itens.
     */
    public removeItem(item : ItemFormulario):void{

        let index = this.getItens().indexOf(item);
        this.getItens().splice(index,1);
    }

    /**
     * @description: Remove vários itens de uma única vez na lista de itens do formulário
     * @param {Array} itens - itens que compõe o formulário de perguntas
     * @obs Caso for remover um único item, use o removeItem() para melhor performance.
     */
    public removeItens(itens:ItemFormulario[]){

        for(let item of itens){
            this.removeItem(item);
        }
    } 
    
    /**
     * @description: Atualiza item  especifico que compõe o formulário de perguntas
     * @param {ItemFormulario} itemAtualizado - item especifico que compõe o formulário de perguntas
     */
    public atualizaItem(itemAtualizado:ItemFormulario):void{
        let itemOld = this.getItens().find( i => i.getIdCabecalho() === itemAtualizado.getIdCabecalho() && 
                                                 i.getItem() === itemAtualizado.getItem() )
        
        if(itemOld){ 
            itemOld.setPergunta( itemAtualizado.getPergunta() );
            itemOld.setBloqueado( itemAtualizado.isBloqueado() ); 
        }
    }
 }