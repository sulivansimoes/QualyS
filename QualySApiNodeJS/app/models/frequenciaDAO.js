//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_D, msg_status_2_D} = require("./../libs/mensagens_padroes"); 

class FrequenciaDAO{

    /**
     * @constructor
     */
    constructor(){
                 
    }


    /**
     * @description : Salva nova frequencia no banco de dados.
     * @param frequencia, objeto contendo informações da nova frequencia que deverá ser salva.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaFrequencia(frequencia, response){

        let cSql    = "INSERT INTO frequencia(descricao) VALUES ( UPPER( TRIM($1) ) )";
        let aValues = [ frequencia.descricao ];

        topConnection.executaQuery(cSql, aValues, response, msg_status_1_A, msg_status_2_A);
    }


    /**
     * @description: Atualiza frequencia no banco de dados.
     * @param {*} frequencia, id da frequencia que deve ser alterada.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaFrequencia(frequencia, response){
       
        let cSql    = "UPDATE frequencia SET descricao = ( UPPER( TRIM($1) ) )" + 
                      " WHERE id = $2 ";

        let aValues = [ 
                        frequencia.descricao, 
                        frequencia.id 
                      ];
        
        topConnection.executaQuery(cSql, aValues, response, msg_status_1_C, msg_status_2_C);
    }


    /**
     * @description: Deleta frequencia do banco de dados.
     * @param {*} idFrequencia, id da frequencia que deve ser deletada.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaFrequencia(idFrequencia, response){

        let cSql    = "DELETE FROM frequencia WHERE id = $1";
        let aValues = [ idFrequencia ];
        
        topConnection.executaQuery(cSql, aValues, response, msg_status_1_B, msg_status_2_B);      
    }


    /**
     * @description Consulta todas as frequencias no banco de dados
     * @param {response} response 
     */
    getAllFrequencias(response){

        let cSql    =  "SELECT id, descricao FROM frequencia"
                    +  " ORDER BY id "

        topConnection.executaQuery(cSql, [],  response, msg_status_1_D, msg_status_2_D);      
    }
}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return FrequenciaDAO;
}