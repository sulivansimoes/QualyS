//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("../libs/mensagens_padroes"); 
const {msg_status_1_D, msg_status_2_D} = require("../libs/mensagens_padroes"); 

class inconformeDAO{

    /**
     * @constructor
     */
    constructor(){

    }


    /**
     * @description Consulta todos os inconformes no banco de dados
     * @param {response} response 
     */
    getAllInconformes(response){

        let cSql    = "SELECT i.id_cadastro_formulario  , "
                    + "       i.item_cadastro_formulario, "
                    + "       i.emissao                 , "
                    + "       i.hora                    , "
                    + "       i.descricao_inconforme    , "
                    + "       i.data_correcao           , "
                    + "       i.acao_corretiva          , "
                    + "       i.cpf_usuario             , "
                    + "       r.pergunta_respondida     , "
                    + "       f.descricao AS descricao_formulario "
                    + " FROM inconformes AS i             "
                    + " INNER JOIN cabecalho_formulario AS f ON f.id = i.id_cadastro_formulario                         "
                    + " INNER JOIN resposta_formulario  AS r ON r.id_cadastro_formulario   = i.id_cadastro_formulario   "
                    + "                                     AND r.item_cadastro_formulario = i.item_cadastro_formulario "
                    + "                                     AND r.emissao = i.emissao "
                    + "                                     AND r.hora    = i.hora    "

        topConnection.executaQuery(cSql, [],  response, msg_status_1_D, msg_status_2_D);      
    }
    
}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return inconformeDAO;
}