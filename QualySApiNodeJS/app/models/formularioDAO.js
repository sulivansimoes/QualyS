//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("../libs/mensagens_padroes"); 
const {msg_status_1_D, msg_status_2_D} = require("../libs/mensagens_padroes"); 

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
                                        formulario.bloqueado             //[05]
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
                    
                    //salva itens
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


    /**
     * @description: Atualiza formulario no banco de dados.
     * @param {*} formulario, formulario que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaFormulario(formulario, response){
        
        (async () => {
            
            this._connection = await this._connection.openPoolConnection();

            try {
            
                //Inicia toda transação
                await this._connection.query('BEGIN');    

                //----------------------------------------------------------------
                // Query para atualizar o cabeçalho do Formulário
                //----------------------------------------------------------------
                let cSql_cabecalho  = " UPDATE cabecalho_formulario SET      "
                                    + "  descricao     = UPPER( TRIM($1) ) , "
                                    + "  id_programa   = $2                , " 
                                    + "  id_local      = $3                , " 
                                    + "  id_frequencia = $4                , " 
                                    + "  bloqueado     = $5                  "
                                    + " WHERE id       = $6                  "; 
                
                                    
                let aCabecalhoValues = [
                                        formulario.descricao    ,        //[01]
                                        formulario.id_programa  ,        //[02]
                                        formulario.id_local     ,        //[03]
                                        formulario.id_frequencia,        //[04]
                                        formulario.bloqueado    ,        //[05]
                                        formulario.id                    //[06]
                                       ];

                
                //Salva cabecalho                                    
                await this._connection.query(cSql_cabecalho, aCabecalhoValues);                                                  

                //----------------------------------------------------------------------
                // Query para atualizar os itens [perguntas] do Formulário já existentes
                //----------------------------------------------------------------------    
                let cSql_itens_atualizados  = " UPDATE item_formulario SET  "
                                            + "  pergunta  = TRIM($1)     , "
                                            + "  bloqueado = $2             "
                                            + " WHERE  id_cabecalho = $3  AND item = $4 ";

 
                for(let item in formulario.itens_atualizados){         

                    let aItensAtualizadosValues = [
                                                    formulario.itens_atualizados[item].pergunta       ,  //[01]
                                                    formulario.itens_atualizados[item].item_bloqueado ,  //[02]
                                                    formulario.id                                     ,  //[03]
                                                    formulario.itens_atualizados[item].item              //[04]
                                                  ];
                    
                    //salva intens atualizados
                    await this._connection.query(cSql_itens_atualizados, aItensAtualizadosValues);
                }

                //----------------------------------------------------------------------
                // Query para deletar os itens [perguntas] do Formulário já existentes
                //----------------------------------------------------------------------    
                if(formulario.itens_deletados.length > 0){                    

                    let cSql_itens_deletados= " DELETE FROM item_formulario  "
                                            + " WHERE  id_cabecalho = $1  AND item = $2 ";

                    for(let item in formulario.itens_deletados){         

                        let aItensDeletadosValues = [                                                                    
                                                    formulario.id                         ,  //[01]
                                                    formulario.itens_deletados[item].item ,  //[02]
                                                    ];
                        
                        //Exclui os itens que foram deletados.
                        await this._connection.query(cSql_itens_deletados, aItensDeletadosValues);
                    }
                }

                //----------------------------------------------------------------------
                // Query para inserir os novos itens [perguntas] no Formulário
                //---------------------------------------------------------------------- 
                if(formulario.itens_inseridos.length > 0){                    
                       
                    let cSql_itens_inseridos= "INSERT INTO item_formulario ( id_cabecalho, item, pergunta, bloqueado ) "
                                            + " VALUES(             " 
                                            + "         $1        , "                                                                              //[01]-id_cabecalho                      
                                            + "         ( SELECT COALESCE( MAX(item) , 0) + 1 FROM item_formulario  WHERE id_cabecalho = $2 ) , "  //[02]-item
                                            + "         TRIM($3)  , "                                                                              //[03]-pergunta
                                            + "         $4          "                                                                              //[04]-bloqueado
                                            + "        )            ";

    
                    for(let item in formulario.itens_inseridos){         

                        let aItensInseridosValues = [
                                                     formulario.id                              ,      //[01]
                                                     formulario.id                              ,      //[02]
                                                     formulario.itens_inseridos[item].pergunta  ,      //[03]
                                                     formulario.itens_inseridos[item].item_bloqueado   //[04]
                                                    ];

                        
                        //Inclui os novos itens
                        await this._connection.query(cSql_itens_inseridos, aItensInseridosValues);
                    }                
                }


                //finaliza transação com Banco
                await this._connection.query('COMMIT');
                
                //Se der tudo certo
                response.status(200).json({ 
                    status:1, 
                    mensagem:msg_status_1_C 
                });

            } catch (erros) {
                
                await this._connection.query('ROLLBACK');
                
                response.status(500).json({ 
                    status:2, 
                    mensagem:msg_status_2_C + erros 
                });
                
            } finally {
                
                this._connection.end();
            }    
            
        })().catch(e => console.error(e));                    
    }


    /**
     * @description: Deleta formulario do banco de dados.
     * @param {*} idFormulario, id do formulario que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaFormulario(idFormulario, response){

        (async () => {
            
            this._connection = await this._connection.openPoolConnection();

            try {
            
                //Inicia toda transação
                await this._connection.query('BEGIN');    

                let cSql_itens      = "DELETE FROM item_formulario WHERE id_cabecalho = $1 ";
                let cSql_cabecalho  = "DELETE FROM cabecalho_formulario WHERE id = $1 ";
                let aValues         = [ idFormulario ];
               
                await this._connection.query(cSql_itens    , aValues); 
                await this._connection.query(cSql_cabecalho, aValues);

                //finaliza transação com Banco
                await this._connection.query('COMMIT');
                
                //Se der tudo certo
                response.status(200).json({ 
                    status:1, 
                    mensagem:msg_status_1_B 
                });

            } catch (erros) {
                
                await this._connection.query('ROLLBACK');
                
                response.status(500).json({ 
                    status:2, 
                    mensagem:msg_status_2_B + erros 
                });
                
            } finally {
                
                console.log("fechou conexão");
                this._connection.end();
            }    
            
        })().catch(e => console.error(e));               
    }


    /**
     * @description Consulta todos cabecalhos dos formularios no banco de dados
     * @param {response} response 
     */
    getAllCabecalhoFormularios(response){

        let cSql   = " SELECT c.id           , "
                   + "        c.descricao    , "
                   + "        c.id_programa  , "
                   + "        c.id_local     , "
                   + "        c.id_frequencia, "
                   + "        c.bloqueado    , "
                   + "        p.descricao    AS descricao_programa   , "
                   + "        l.descricao    AS descricao_local      , "
                   + "        f.descricao    AS descricao_frequencia   "
                   + " FROM cabecalho_formulario AS c "
                   + " INNER JOIN programas  	 AS p ON p.id  = c.id_programa   "
                   + " INNER JOIN frequencia 	 AS f ON f.id  = c.id_frequencia "
                   + " INNER JOIN local			 AS l ON l.id  = c.id_local "
                 
        topConnection.executaQuery(cSql, [],  response, msg_status_1_D, msg_status_2_D);      
    } 
    
    
    /**
     * @description Consulta itens de um formulario especifico por ID no banco de dados
     * @param {number  } id - id do formulario a ser localizado
     * @param {response} response 
     */
    findItensFormularioPorId(id, response){

       let cSql   = " SELECT * FROM item_formulario  "
                  + " WHERE id_cabecalho = $1 "
       
       let aValues= [ id ];

       topConnection.executaQuery(cSql, aValues,  response, msg_status_1_D, msg_status_2_D);      
    }     
        

    /**
     * @description Consulta um formulario [cabecalho e itens] especifico por ID no banco de dados
     * @param {number  } id - id do formulario a ser localizado
     * @param {response} response 
     */    
    findFormularioPorId(id, response){

        let cSql   = " SELECT c.id           , "
                   + "        c.descricao    , "
                   + "        c.id_programa  , "
                   + "        c.id_local     , "
                   + "        c.id_frequencia, "
                   + "        c.bloqueado    , "
                   + "        p.sigla        , "
                   + "        p.descricao    AS descricao_programa   , "
                   + "        i.item         , "
                   + "        i.pergunta       "
                   + " FROM cabecalho_formulario  AS c "
                   + " INNER JOIN item_formulario AS i ON i.id_cabecalho = c.id   "
                   + " INNER JOIN programas  	  AS p ON p.id  = c.id_programa   "
                   + " WHERE c.id = $1 "
                   + "       AND i.bloqueado = false ";  //Não considera perguntas bloqueadas.
        
        let aValues = [id];        
                  
        topConnection.executaQuery(cSql, aValues, response, msg_status_1_D, msg_status_2_D);         
    }


    /**
     * @description Consulta itens de um formulario especifico por ID no banco de dados
     * @param {String  } descricao - descrição do formulario a ser localizado
     * @param {response} response 
     */    
    getCabecalhoFormularioPorDescricao(descricao, response){

        let cSql   = " SELECT c.id           , "
                   + "        c.descricao    , "
                   + "        c.id_programa  , "
                   + "        c.id_local     , "
                   + "        c.id_frequencia, "
                   + "        c.bloqueado    , "
                   + "        p.descricao    AS descricao_programa   , "
                   + "        l.descricao    AS descricao_local      , "
                   + "        f.descricao    AS descricao_frequencia   "
                   + " FROM cabecalho_formulario AS c "
                   + " INNER JOIN programas  	 AS p ON p.id  = c.id_programa   "
                   + " INNER JOIN frequencia 	 AS f ON f.id  = c.id_frequencia "
                   + " INNER JOIN local			 AS l ON l.id  = c.id_local "
                   + " WHERE c.descricao LIKE UPPER('%' || $1 || '%') "
                 
        let aValues = [ descricao ];        
                   
        topConnection.executaQuery(cSql, aValues,  response, msg_status_1_D, msg_status_2_D);      
    }
    
}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return FormularioDAO;
}