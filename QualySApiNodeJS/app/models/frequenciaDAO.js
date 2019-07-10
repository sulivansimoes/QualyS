//Bibliotecas
var {msg_status_1_A, msg_status_2_A} = require("./../libs/mensagens_padroes"); 
var {msg_status_1_B, msg_status_2_B} = require("./../libs/mensagens_padroes"); 

class FrequenciaDAO{

    /**
     * @constructor
     * @param {*} connection, instancia de uma conexão do PostgreSQL. 
     */
    constructor(connection){
                 
        this._connection = connection;
    }

    /**
     * @description : Salva nova frequencia no banco de dados.
     * @param frequencia, objeto contendo informações da nova frequencia que deverá ser salva.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaFrequencia(frequencia, response){

        this._connection = this._connection.openPoolConnection();
        
        let cSql    = "INSERT INTO frequencia(descricao) VALUES ( UPPER( TRIM($1) ) )";
        let aValues = [ frequencia.descricao ];

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
     * @description: Deleta frequencia do banco de dados.
     * @param {*} idFrequencia, id da frequencia que deve ser deletada.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaFrequencia(idFrequencia, response){

        this._connection = this._connection.openPoolConnection();
        
        let cSql    = "DELETE FROM frequencia WHERE id = $1";
        let aValues = [ idFrequencia ];
        
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
    return FrequenciaDAO;
}