/**
 * @description: Classe de Objeto de tranferecia ( TO ) de PROGRAMA 
 */
export class Programa{

   private id           :number;
   private descricao    :string;
   private sigla        :string;
   private dataVigencia :Date;
   private dataRevisao  :Date;
   private versao       :string;
   private oficio       :string;
   private bloqueado    :boolean;

   /**
    * @constructor 
    * @param {number } id           - Código identificador do programa ( chave primária )
    * @param {string } descricao    - Descrição do programa
    * @param {string } sigla        - Sigla ( abreviação ) da descrição do programa
    * @param {Date   } dataVigencia - Data da vigencia do programa do programa.
    * @param {Date   } dataRevisao  - Data em que programa foi revisado.
    * @param {string } versao       - Versão do programa.
    * @param {string } oficio       - Oficio circular do programa.
    * @param {boolean} bloqueado    - Flag do cadastro, indicando se está ou não bloqueado.
    */
   constructor(id?:number        , descricao?:string , sigla?:string  , dataVigencia?:Date,
               dataRevisao?:Date , versao?:string    , oficio?:string , bloqueado?:boolean){

        this.id           = id;
        this.descricao    = descricao;
        this.sigla        = sigla;
        this.dataVigencia = dataVigencia;
        this.dataRevisao  = dataRevisao;
        this.versao       = versao;
        this.oficio       = oficio;
        this.bloqueado    = (bloqueado == null) ? false : bloqueado;
   }

   /**
    * @description: Retorna código do id referente ao ao formulário.
    * @return {number} ( id ) - Código do id referente ao ao formulário.
    */
   public getId():number{
       return this.id;
   }

   /**
    * @description: Retorna descrição do programa.
    * @return {number} ( descricao ) - Descrição do programa.
    */
   public getDescricao():string{
       return this.descricao;
   }

   /**
    * @description: Retorna sigla ( abreviação ) do programa.
    * @return {string} ( sigla ) - Sigla ( abreviação ) do programa.
    */
   public getSigla():string{
       return this.sigla;
   }

   /**
    * @description: Retora data de vigecia do progrma.
    * @return {Date} ( dataVigencia ) - Data vigencia do programa.
    */
   public getDataVigencia():Date{
       return this.dataVigencia;
   }

   /**
    * @description: Retorna data em que programa foi revisado.
    * @return {Date} ( dataRevisao ) - Data em que programa foi revisado.
    */
   public getDataRevisao():Date{
       return this.dataRevisao;
   }

   /**
    * @description: Retorna versão em que o progrma se encontra.
    * @return {string} ( versao ) - Versão em que o progrma se encontra.
    */
   public getVersao():string{
        return this.versao;
   }

   /**
    * @description: Retorna oficio circular referente ao programa.
    * @return {string} ( oficio ) - Oficio circular referente ao programa.
    */
   public getOficio():string{
       return this.oficio;
   }

   /**
    * @description: Retorna flag do cadastro, indicando se está ou não bloqueado.
    * @return {boolean} bloqueado - Flag do cadastro, indicando se está ou não bloqueado.
    */
   public isBloqueado():boolean{
       return this.bloqueado;
   }

   /**
    * @description: Seta conteudo do Id referente ao programa.
    * @param {number} id - Id do programa.
    */
   public setId(id:number):void{
       this.id = id;
   }

   /**
    * @description: Seta conteudo da descrição do programa.
    * @param {string} descricao - Descricao do programa.
    */
   public setDescricao(descricao:string):void{
        this.descricao = descricao;
   }

   /**
    * @description: Seta conteudo da sigla do programa.
    * @param {string} sigla - Sigla ( abreviação ) do programa.
    */
   public setSigla(sigla:string):void{
        this.sigla = sigla;
   }

   /**
    * @description: Seta conteudo da data de vigencia do programa.
    * @param {Date} dataVigencia - Data de vigencia do programa.
    */
   public setDataVigencia(dataVigencia:Date):void{
        this.dataVigencia = dataVigencia;
   }

   /**
    * @description: Seta conteudo da data em que programa foi revisado.
    * @param {Date} dataRevisao - Data em que programa foi revisao.
    */
   public setDataRevisao(dataRevisao:Date):void{
       this.dataRevisao = dataRevisao;
   }

   /**
    * @description: Seta conteudo da versão do programa.
    * @param {string} versao - Versão do programa.
    */
   public setVersao(versao:string):void{
        this.versao = versao;
   }

   /**
    * @description: Seta oficio circular do programa.
    * @param {string} oficio - Oficio do programa.
    */
   public setOficio(oficio:string):void{
        this.oficio = oficio;
   }

   /**
    * @description Seta status do registro, true caso esteja bloqueado, false caso contrário.
    * @param {boolean} bloqueado - Flag indicando se registro está ou não bloqueado para uso.
    */
   public setBloqueado(bloqueado:boolean):void{
        this.bloqueado = bloqueado;
   }
   
}