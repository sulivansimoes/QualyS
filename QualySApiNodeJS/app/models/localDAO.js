//Bibliotecas
const {msg_status_1_A, msg_status_2_A} = require("../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("../libs/mensagens_padroes"); 

class LocalDAO{

    /**
     * @constructor
     * @param {*} connection, instancia de uma conexão do PostgreSQL. 
     */
    constructor(connection){
                 
        this._connection = connection;
    }


    /**
     * @description : Salva nova local no banco de dados.
     * @param local, objeto contendo informações da nova local que deverá ser salva.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaLocal(local, response){

        this._connection = this._connection.openPoolConnection();
        
        let cSql    = "INSERT INTO local( descricao, bloqueado ) "
                    + " VALUES(                    " 
                    + "         UPPER( TRIM($1) ), "                              
                    + "         $2                 "
                    + "        )                   ";

        let aValues = [ 
                        local.descricao,
                        local.bloqueado,
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
                                            this._connection.end();
                                        });
    }


    /**
     * @description: Atualiza local no banco de dados.
     * @param {*} local, id da local que deve ser alterada.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaLocal(local, response){
       
        this._connection = this._connection.openPoolConnection();
        
        let cSql    = "UPDATE local SET "
                    + " descricao = ( UPPER( TRIM($1) ) ) , " 
                    + " bloqueado = $2 "
                    + " WHERE id  = $3 ";

        let aValues = [ 
                        local.descricao, 
                        local.bloqueado, 
                        local.id       , 
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
     * @description: Deleta local do banco de dados.
     * @param {*} idLocal, id do local que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaLocal(idLocal, response){

        this._connection = this._connection.openPoolConnection();
         
        let cSql    = "DELETE FROM local WHERE id = $1";
        let aValues = [ idLocal ];
         
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
    return LocalDAO;
}