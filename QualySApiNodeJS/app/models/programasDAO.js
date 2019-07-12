//Bibliotecas
const {msg_status_1_A, msg_status_2_A} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("./../libs/mensagens_padroes"); 


class ProgramasDAO{

    /**
     * @constructor
     * @param {*} connection, instancia de uma conexão do PostgreSQL. 
     */
    constructor(connection){
                 
        this._connection = connection;
    }
    

    /**
     * @description : Salva novo programa no banco de dados.
     * @param programa, objeto contendo informações da nova frequencia que deverá ser salva.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaPrograma(programa, response){

        this._connection = this._connection.openPoolConnection();
        
        let cSql    = "INSERT INTO programas(descricao, sigla, data_vigencia, data_revisao, versao, oficio, bloqueado) "
                    + " VALUES(                    " 
                    + "         UPPER( TRIM($1) ), "   //[01]-descricao                          
                    + "         UPPER( TRIM($2) ), "   //[02]-sigla
                    + "         $3               , "   //[03]-data_vigencia
                    + "         $4               , "   //[04]-data_revisao
                    + "         UPPER( TRIM($5) ), "   //[05]-versao
                    + "         TRIM($6)         , "   //[06]-oficio
                    + "         $7                 "   //[07]-bloqueado
                    + "        )                   "

        let aValues = [ 
                        programa.descricao    ,   //[01]
                        programa.sigla        ,   //[02]
                        programa.data_vigencia,   //[03]
                        programa.data_revisao ,   //[04]
                        programa.versao       ,   //[05]
                        programa.oficio       ,   //[06]
                        programa.bloqueado    ,   //[07]
                      ];

        this._connection.query(cSql, aValues)
                        .then( ()    => {   
                                            response.status(200).json({ 
                                                                        status:1, 
                                                                        mensagem:msg_status_1_A
                                                                     });
                                        })
                        .catch(erros => {                                             
                                            response.status(500).json({ 
                                                                        status:2, 
                                                                        mensagem:msg_status_2_A + erros 
                                                                     });
                                        })
                        .finally(()  => {
                                            console.log("fechou conexão");
                                            this._connection.end();
                                        });
    }    


    /**
     * @description: Atualiza programa no banco de dados.
     * @param {*} programa,  programa que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaPrograma(programa, response){
       
        this._connection = this._connection.openPoolConnection();
        
        let cSql    = "UPDATE programas SET                "
                    + " descricao     = UPPER( TRIM($1) ), "    //[01]   
                    + " sigla         = UPPER( TRIM($2) ), "    //[02]
                    + " data_vigencia = $3               , "    //[03]
                    + " data_revisao  = $4               , "    //[04]
                    + " versao        = UPPER( TRIM($5) ), "    //[05]
                    + " oficio        = TRIM($6)         , "    //[06]
                    + " bloqueado     = $7                 "    //[07]
                    + " WHERE id      = $8                 "    //[08]
                    
        let aValues = [ 
                        programa.descricao    ,   //[01]
                        programa.sigla        ,   //[02]
                        programa.data_vigencia,   //[03]
                        programa.data_revisao ,   //[04]
                        programa.versao       ,   //[05]
                        programa.oficio       ,   //[06]
                        programa.bloqueado    ,   //[07]
                        programa.id               //[08]
                      ];

        this._connection.query(cSql, aValues)
                        .then( ()    => {   
                                            response.status(200).json({ 
                                                                        status:1, 
                                                                        mensagem:msg_status_1_C
                                                                     });
                                        })
                        .catch(erros => {                                             
                                            response.status(500).json({ 
                                                                        status:2, 
                                                                        mensagem:msg_status_2_C + erros 
                                                                     });
                                        })
                        .finally(()  => {
                                            this._connection.end();
                                        }); 
    }  
    
    
    /**
     * @description: Deleta programa do banco de dados.
     * @param {*} idPrograma, id do programa que deve ser deletada.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaPrograma(idPrograma, response){

        this._connection = this._connection.openPoolConnection();
         
        let cSql    = "DELETE FROM programas WHERE id = $1";
        let aValues = [ idPrograma ];
         
        this._connection.query(cSql, aValues)
                        .then( ()    => {   
                                            response.status(200).json({ 
                                                                        status:1, 
                                                                        mensagem:msg_status_1_B
                                                                     });
                                        })
                        .catch(erros => {                                             
                                            response.status(500).json({ 
                                                                        status:2, 
                                                                        mensagem:msg_status_2_B + erros 
                                                                     });
                                        })
                        .finally(()  => {
                                            this._connection.end();                                                           
                                        });        
    }


}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return ProgramasDAO;
}