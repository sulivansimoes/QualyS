//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("../libs/mensagens_padroes"); 
const {msg_status_1_D, msg_status_2_D} = require("../libs/mensagens_padroes"); 

class RespostaFormularioDAO{

    /**
     * @constructor
     * @param {*} connection, instancia de uma conexão do PostgreSQL. 
     */
    constructor(connection){
                 
        this._connection = connection;
    }


    /**
     * @description : Salva nova resposta do formulario de perguntas no banco de dados.
     * @param formulario, objeto contendo informações das respostas do formulario de perguntas que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaRespostasFormulario(respostas, response){       
        
        (async () => {
            
            this._connection = await this._connection.openPoolConnection();

            try {
            
                //Inicia toda transação
                await this._connection.query('BEGIN');    

                //----------------------------------------------------------------
                // Query para salvar o resposta_formulario
                //----------------------------------------------------------------
                let cSql_resposta  = "INSERT INTO resposta_formulario (                            "
                                   + "                                  id_cadastro_formulario   , "
                                   + "                                  item_cadastro_formulario , "
                                   + "                                  pergunta_respondida      , "
                                   + "                                  emissao                  , "
                                   + "                                  hora                     , "
                                   + "                                  cpf_usuario              , "
                                   + "                                  conforme                   "
                                   + "                                 )                           "
                                   + " VALUES(                    " 
                                   + "         $1               , "    //[01]-id_cadastro_formulario                      
                                   + "         $2               , "    //[02]-item_cadastro_formulario
                                   + "         TRIM($3)         , "    //[03]-pergunta_respondida
                                   + "         $4               , "    //[04]-emissao
                                   + "         $5               , "    //[05]-hora
                                   + "         $6               , "    //[06]-cpf_usuario [usuario que respondeu o formulario]
                                   + "         $7                 "    //[07]-conforme
                                   + "        )                   ";

                //salva todas respostas.                   
                for( let item = 0; item < respostas.itens.length; item++ ){

                    let aRespostaValues = [
                                            respostas.idCabecalho          ,        //[01]
                                            respostas.itens[item].item     ,        //[02]
                                            respostas.itens[item].pergunta ,        //[03]
                                            respostas.dataEmissao          ,        //[04]
                                            respostas.horaEmissao          ,        //[05]
                                            respostas.cpfUsuario           ,        //[06]
                                            respostas.itens[item].conforme          //[07]
                                           ];
    
                    
                    //Salva resposta
                    await this._connection.query(cSql_resposta, aRespostaValues);                                  
                }                                   
                

                //----------------------------------------------------------------
                // Query para salvar os inconformes gerados
                //----------------------------------------------------------------                        
                if(respostas.inconformes.length > 0){

                    let cSql_inconformes  = "INSERT INTO inconformes (                            " 
                                          + "                          id_cadastro_formulario   , "
                                          + "                          item_cadastro_formulario , "
                                          + "                          emissao                  , "
                                          + "                          hora                     , "
                                          + "                          descricao_inconforme       "
                                          + "                         )                           "
                                          + " VALUES(                    " 
                                          + "         $1               , "  //[01]-id_cadastro_formulario                      
                                          + "         $2               , "  //[02]-item_cadastro_formulario
                                          + "         $3               , "  //[03]-emissao
                                          + "         $4               , "  //[04]-hora
                                          + "         UPPER( TRIM($5) )  "  //[05]-descricao_inconforme                          
                                          + "        )                   ";
    
     
                    for(let item in respostas.inconformes){         
    
                        let aInconformesValues = [
                                                    respostas.idCabecalho            ,                 //[01]
                                                    respostas.inconformes[item].item ,                 //[02]
                                                    respostas.dataEmissao            ,                 //[03]
                                                    respostas.horaEmissao            ,                 //[04]
                                                    respostas.inconformes[item].descricao_inconforme,  //[06]
                                                  ];
                        
                        //salva inconformes
                        await this._connection.query(cSql_inconformes, aInconformesValues);
                    }
                }

                //finaliza transação com Banco
                await this._connection.query('COMMIT');
                
                //Se der tudo certo
                response.status(200).json({ 
                    status:1, 
                    mensagem:msg_status_1_A 
                });

            } catch (erros) {
                
                await this._connection.query('ROLLBACK');
                
                response.status(500).json({ 
                    status:2, 
                    mensagem:msg_status_2_A + erros 
                });
                
            } finally {
                
                this._connection.end();
            }    
            
        })().catch(e =>  response.status(500).json({ 
            status:2, 
            mensagem:msg_status_2_A + e 
        }));                                                 
    }


    /**
     * @description : Localiza as vistorias realizadas dentro de um periodo e de um formulario especifico.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */    
    getVistoriasRealizadas( response ){

        let cSql = " SELECT r.id_cadastro_formulario       ,"
                 + "        r.item_cadastro_formulario     ," 
                 + "        c.descricao AS nome_formulario ,"
                 + "        r.pergunta_respondida          ," 
                 + "        r.emissao                      ," 
                 + "        r.hora                         ," 
                 + "        u.nome AS colaborador          ,"
                 + "        r.conforme                     ,"
                 + "        l.descricao AS local           ,"
                 + "        f.descricao AS frequencia      ,"
                 + "        p.oficio                       ,"
                 + "        p.data_revisao                 ,"
                 + "        p.data_vigencia                ,"
                 + "        p.versao                       ,"
                 + "        img.imgbase64                   "
                 + " FROM RESPOSTA_FORMULARIO 		 AS r   "
                 + " INNER JOIN cabecalho_formulario AS c ON c.id = r.id_cadastro_formulario "
                 + " INNER JOIN item_formulario		 AS i ON id_cabecalho = id_cadastro_formulario AND item = item_cadastro_formulario "
                 + " INNER JOIN programas 			 AS p ON p.id = c.id_programa   "
                 + " INNER JOIN local			     AS l ON l.id = c.id_local      "
                 + " INNER JOIN frequencia 			 AS f ON f.id = c.id_frequencia "
                 + " INNER JOIN usuario 		  	 AS u ON r.cpf_usuario = u.cpf  "
                 + " INNER JOIN imagem               as img ON u.id_imagem_assinatura = img.id "
                //  + " WHERE r.id_cadastro_formulario =  $1 "
                //  + "   AND r.emissao BETWEEN '2019-07-01' AND '2019-09-02' "
                 + " ORDER BY r.emissao, r.hora, r.item_cadastro_formulario ";

        let aValues =  [
                        //  17
                       ];

        topConnection.executaQuery(cSql, [], response, msg_status_1_D, msg_status_2_D);
    }

}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return RespostaFormularioDAO;
}