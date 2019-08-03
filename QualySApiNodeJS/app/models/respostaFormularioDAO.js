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
                                   + "         UPPER( TRIM($3) ), "    //[03]-pergunta_respondida
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
                
                console.log("fechou conexão");
                this._connection.end();
            }    
            
        })().catch(e => console.error(e));                                                 
    }

}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return RespostaFormularioDAO;
}