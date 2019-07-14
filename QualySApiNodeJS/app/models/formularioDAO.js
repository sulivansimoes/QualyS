//Bibliotecas
const {msg_status_1_A, msg_status_2_A} = require("../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("../libs/mensagens_padroes"); 

class FormularioDAO{

    /**
     * @constructor
     * @param {*} connection, instancia de uma conexão do PostgreSQL. 
     */
    constructor(connection){
                 
        this._connection = connection;
    }


    /**
     * @description : Salva novo formulario de perguntas no banco de dados.
     * @param formulario, objeto contendo informações da novo formulario de perguntas que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaFormulario(formulario, response){       
        
        let idCabecalho = null;

        (async () => {
            
            this._connection = await this._connection.openPoolConnection();

            try {
            
                //Inicia toda transação
                await this._connection.query('BEGIN');    

                //----------------------------------------------------------------
                // Query para salvar o cabeçalho do Formulário
                //----------------------------------------------------------------
                let cSql_cabecalho  = "INSERT INTO cabecalho_formulario (descricao, id_programa, id_local, id_frequencia, bloqueado) "
                                    + " VALUES(                    " 
                                    + "         UPPER( TRIM($1) ), "    //[01]-descricao                      
                                    + "         $2               , "    //[02]-id_programa
                                    + "         $3               , "    //[03]-id_local
                                    + "         $4               , "    //[04]-id_frequencia
                                    + "         $5                 "    //[05]-bloqueado
                                    + "        )                   "
                                    + " RETURNING id               "; 
                                    
                let aCabecalhoValues = [
                                        formulario.descricao    ,        //[01]
                                        formulario.id_programa  ,        //[02]
                                        formulario.id_local     ,        //[03]
                                        formulario.id_frequencia,        //[04]
                                        formulario.cabecalho_bloqueado   //[05]
                                       ];

                
                //Salva cabecalho e recupera id                                    
                idCabecalho = await this._connection.query(cSql_cabecalho, aCabecalhoValues);                                  
                idCabecalho = idCabecalho.rows[0].id;

                //----------------------------------------------------------------
                // Query para salvar os itens [perguntas] do Formulário 
                //----------------------------------------------------------------                        
                let cSql_itens  = "INSERT INTO item_formulario ( id_cabecalho, item, pergunta, bloqueado ) "
                                + " VALUES(             " 
                                + "         $1        , "                                                                              //[01]-id_cabecalho                      
                                + "         ( SELECT COALESCE( MAX(item) , 0) + 1 FROM item_formulario  WHERE id_cabecalho = $2 ) , "  //[02]-item
                                + "         TRIM($3)  , "                                                                              //[03]-pergunta
                                + "         $4          "                                                                              //[04]-bloqueado
                                + "        )            ";

 
                for(let item in formulario.itens){         

                    let aItensValues = [
                                        idCabecalho                     ,       //[01]
                                        idCabecalho                     ,       //[02]
                                        formulario.itens[item].pergunta ,       //[03]
                                        formulario.itens[item].item_bloqueado   //[04]
                                       ];
                    
                     //salva intens
                     await this._connection.query(cSql_itens, aItensValues);
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
    return FormularioDAO;
}