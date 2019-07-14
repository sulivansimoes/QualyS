//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("../libs/mensagens_padroes"); 

class LocalDAO{

    /**
     * @constructor
     */
    constructor(){

    }


    /**
     * @description : Salva novo local no banco de dados.
     * @param local, objeto contendo informações da nova local que deverá ser salva.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaLocal(local, response){
        
        let cSql    = "INSERT INTO local( descricao, bloqueado ) "
                    + " VALUES(                    " 
                    + "         UPPER( TRIM($1) ), "                              
                    + "         $2                 "
                    + "        )                   ";

        let aValues = [ 
                        local.descricao,
                        local.bloqueado,
                      ];
        
        topConnection.executaQuery(cSql, aValues, response, msg_status_1_A, msg_status_2_A);
    }


    /**
     * @description: Atualiza local no banco de dados.
     * @param {*} local, id da local que deve ser alterada.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaLocal(local, response){
       
        let cSql    = "UPDATE local SET "
                    + " descricao = ( UPPER( TRIM($1) ) ) , " 
                    + " bloqueado = $2 "
                    + " WHERE id  = $3 ";

        let aValues = [ 
                        local.descricao, 
                        local.bloqueado, 
                        local.id       , 
                      ];

        topConnection.executaQuery(cSql, aValues, response, msg_status_1_C, msg_status_2_C);
    }
    

    /**
     * @description: Deleta local do banco de dados.
     * @param {*} idLocal, id do local que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaLocal(idLocal, response){

        let cSql    = "DELETE FROM local WHERE id = $1";
        let aValues = [ idLocal ];
         
        topConnection.executaQuery(cSql, aValues, response, msg_status_1_B, msg_status_2_B);     
    }
    
}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return LocalDAO;
}