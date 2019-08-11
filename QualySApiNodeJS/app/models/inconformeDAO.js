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
     * @param response, objeto de response da requisição.
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
                    + " ORDER BY i.emissao DESC "

        topConnection.executaQuery(cSql, [],  response, msg_status_1_D, msg_status_2_D);      
    }
    

    /**
     * @description Consulta os inconformes pela data que foram gerados
     * @param {Response} response, objeto de response da requisição.
     * @param {Date    } dataInconforme, data que inconformidade foi gerada no sistema. 
     */
    getInconformesPorDataDeEmissao(response, dataInconforme){

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
                    + " WHERE i.emissao = $1    "
                    + " ORDER BY i.emissao DESC ";
        
        let aValues = [ dataInconforme ];

        topConnection.executaQuery(cSql, aValues,  response, msg_status_1_D, msg_status_2_D);      
    }

    /**
     * @description Atualiza inconforme fazendo atualização necessária para que o mesmo fique na situação de CORRIGIDO.
     * @param {response} response, objeto de response da requisição.
     * @param {number  } idInconforme, id do inconforme que foi corrigido.
     * @param {number  } itemIconforme, item do inconforme que foi corrigido.
     * @param {date    } emissao, data em que não conformidade foi gerada.
     * @param {date    } hora, hora em que não conformidade foi gerada. 
     * @param {string  } acaoCorretiva, ação que foi feita para corrigir a não conformidade
     * @param {date    } dataCorrecao, data em que não conformidade foi corrigida.
     */
    corrigeInconforme(response, idInconforme, itemIconforme, emissao, hora, acaoCorretiva, dataCorrecao){

        let cSql = "UPDATE inconformes SET "
                 + "  acao_corretiva = ( UPPER( TRIM($1) ) ) , "
                 + "  data_correcao  = $2                      "
                 + " WHERE id_cadastro_formulario   = $3       "
                 + "   AND item_cadastro_formulario = $4       "
                 + "   AND emissao = $5                        "
                 + "   AND hora    = $6                        "
        
        let aValues = [
                        acaoCorretiva,  //[01]
                        dataCorrecao ,  //[02]
                        idInconforme ,  //[03]
                        itemIconforme,  //[04]
                        emissao      ,  //[05]
                        hora         ,  //[06]
                      ];


        topConnection.executaQuery(cSql, aValues,  response, msg_status_1_C, msg_status_2_C);      
    }


    /**
     * @description Atualiza inconforme fazendo atualização necessária para que a ação corretiva do inconforme seja estornada.
     * @param {response} response, objeto de response da requisição.
     * @param {number  } idInconforme, id do inconforme que foi estonado.
     * @param {number  } itemIconforme, item do inconforme que foi estornado.
     * @param {date    } emissao, data em que não conformidade foi estornado.
     * @param {date    } hora, hora em que não conformidade foi estornado. 
     */
    estornaAcaoCorretiva(response, idInconforme, itemIconforme, emissao, hora){

        let cSql = "UPDATE inconformes SET  "
                 + "  acao_corretiva = '' , "
                 + "  data_correcao  = null                "
                 + " WHERE id_cadastro_formulario   = $1   "
                 + "   AND item_cadastro_formulario = $2   "
                 + "   AND emissao = $3                    "
                 + "   AND hora    = $4                    "
        
        let aValues = [
                        idInconforme ,  //[01]
                        itemIconforme,  //[02]
                        emissao      ,  //[03]
                        hora         ,  //[04]
                      ];


        topConnection.executaQuery(cSql, aValues,  response, msg_status_1_C, msg_status_2_C);      
    }
}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return inconformeDAO;
}