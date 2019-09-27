//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_D, msg_status_2_D} = require("./../libs/mensagens_padroes"); 

class usuarioDAO{

    /**
     * @constructor
     * @param {*} connection, instancia de uma conexão do PostgreSQL. 
     */
    constructor(connection){
     
        this._connection = connection;
    }


    /**
     * @description : Salva novo usuario no banco de dados.
     * @param usuario, objeto contendo informações do novo usuario que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaUsuario(usuario, response){

        let idImagem = null;

        (async () => {

            this._connection = await this._connection.openPoolConnection();

            try {

                    //Inicia toda transação
                    await this._connection.query('BEGIN');    

                    //----------------------------------------------------------------
                    // Query para  salvar imagem no banco de dados
                    //----------------------------------------------------------------
                    let cSqlImagem    = " INSERT INTO imagem( imgbase64 ) "
                                      + " VALUES ( TRIM($1) ) "
                                      + " RETURNING id  ";

                    let aValuesImagem = [ usuario.assinatura ];

                    //Salva imagem e recupera id                                    
                    idImagem = await this._connection.query(cSqlImagem, aValuesImagem);                                  
                    idImagem = idImagem.rows[0].id;

                    //----------------------------------------------------------------
                    // Query para  salvar usuario no banco de dados
                    //----------------------------------------------------------------
                    let cSqlUsuario  = "INSERT INTO usuario(cpf, nome, email, senha, id_imagem_assinatura, bloqueado, perfil) "
                                     + " VALUES(                    " 
                                     + "         TRIM($1)         , "   //[01]-cpf                          
                                     + "         TRIM($2)         , "   //[02]-nome
                                     + "         LOWER( TRIM($3) ), "   //[03]-email
                                     + "         TRIM($4)         , "   //[04]-senha
                                     + "         $5               , "   //[05]-assinatura código da imagem
                                     + "         $6               , "   //[06]-bloqueado
                                     + "         $7                 "   //[07]-perfil
                                     + "        )                   "
                                                         
                    let aValuesUsuario = [ 
                                            usuario.cpf         ,   //[01]
                                            usuario.nome        ,   //[02]
                                            usuario.email       ,   //[03]
                                            usuario.senha       ,   //[04]
                                            idImagem            ,   //[05] 
                                            usuario.bloqueado   ,   //[06]
                                            usuario.perfil      ,   //[07]
                                         ];
                
                    //Salva o usuário
                    await this._connection.query(cSqlUsuario, aValuesUsuario);                                  

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
        })().catch(e => response.status(500).json({ 
            mensagem: e 
        }));
    }


    /**
     * @description: Atualiza usuario no banco de dados.
     * @param {*} local, id do usuario que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaUsuario(usuario, response){
       
        let idImagem = null;

        (async () => {

            this._connection = await this._connection.openPoolConnection();

            try {

                    //Inicia toda transação
                    await this._connection.query('BEGIN');    

                    //----------------------------------------------------------------
                    // Query para  alterar usuario no banco de dados
                    //----------------------------------------------------------------
                    let cSqlUsuario = "UPDATE usuario SET "
                                    + " nome       = TRIM($1)         , "                //[01]-nome                              
                                    + " email      = LOWER( TRIM($2) ), "                //[02]-email                      
                                    + " bloqueado  = $3               , "                //[03]-bloqueado
                                    +  "perfil    =  $4                 "                //[04]-Perfil
                        cSqlUsuario += (usuario.senha) ? ", senha  = TRIM($6) " : "";    //[05]-senha     
                        cSqlUsuario += " WHERE cpf  = TRIM($5)           "               //[06]-cpf
                        cSqlUsuario += " RETURNING id_imagem_assinatura  ";

                    let aValuesUsuario = [ 
                                            usuario.nome        ,   //[01]
                                            usuario.email       ,   //[02]                        
                                            usuario.bloqueado   ,   //[03]
                                            usuario.perfil      ,   //[04]
                                            usuario.cpf         ,   //[05]
                                         ];
                    
                    if(usuario.senha){
                        aValuesUsuario.push(usuario.senha);                //[06]
                    } 
                
                    //Altera o usuário e pega o id da Imagem
                    idImagem = await this._connection.query(cSqlUsuario, aValuesUsuario);     
                    idImagem = idImagem.rows[0].id_imagem_assinatura;

                    if(usuario.assinatura){

                        //----------------------------------------------------------------
                        // Query para  alterar imagem no banco de dados
                        //----------------------------------------------------------------
                        let cSqlImagem = " UPDATE imagem SET "
                                       + " imgbase64 = TRIM($1) "
                                       + " WHERE id = $2 ";

                        let aValuesImagem = [
                                              usuario.assinatura, 
                                              idImagem 
                                            ];

                        //Altera imagem                                     
                        await this._connection.query(cSqlImagem, aValuesImagem);                                  
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
        })().catch(e => response.status(500).json({ 
            mensagem: e 
        }));

    }
    

    /**
     * @description: Deleta usuario do banco de dados.
     * @param {*} cpf, cpf do usuario que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaUsuario(cpf, response){

        let idImagem = null;

        (async () => {

            this._connection = await this._connection.openPoolConnection();

            try {

                    //Inicia toda transação
                    await this._connection.query('BEGIN');    

                    //----------------------------------------------------------------
                    // Query para  deletar usuario no banco de dados
                    //----------------------------------------------------------------        
                    let cSqlUsuario    = "DELETE FROM usuario WHERE cpf = TRIM($1)"
                                       + " RETURNING id_imagem_assinatura  ";
                    let aValuesUsuario = [ cpf ];
        
                    idImagem = await this._connection.query(cSqlUsuario, aValuesUsuario);                                  
                    idImagem = idImagem.rows[0].id_imagem_assinatura;                                  

                    
                    //----------------------------------------------------------------  
                    // Query para  deletar imagem de assinatura do banco de dados
                    //----------------------------------------------------------------                      
                    let cSqlImagem    = "DELETE FROM imagem WHERE id = $1";
                    let aValuesImagem = [ idImagem ];

                    //deleta imagem do banco
                    await this._connection.query(cSqlImagem, aValuesImagem);  

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
                
                this._connection.end();
            } 
        })().catch(e => response.status(500).json({ 
            status:2, 
            mensagem:msg_status_2_B + e 
        }));
    }


    /**
     * @description Consulta todos os usuarios no banco de dados
     * @param {response} response 
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    getAllUsuarios(response){

        let cSql    =  "SELECT cpf, "
                    +  "       nome," 
                    +  "       email,"
                    +  "       bloqueado, "
                    +  "       perfil "
                    +  " FROM usuario "
                    +  " ORDER BY nome "

        topConnection.executaQuery(cSql, [],  response, msg_status_1_D, msg_status_2_D);      
    }


    /**
     * @description Consulta os usuarios no banco de dados por descrição
     * @param {String  } nome, nome à ser pesquisado.
     * @param {response} response 
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    getUsuariosPorNome(nome , response){

        let cSql    =  "SELECT cpf, "
                    +  "       nome," 
                    +  "       email,"
                    +  "       bloqueado, "
                    +  "       perfil "
                    +  " FROM usuario "
                    +  " WHERE nome LIKE ('%' || $1 || '%')"
                    +  " ORDER BY nome "
                    
        let aValues = [ nome ];

        topConnection.executaQuery(cSql, aValues,  response, msg_status_1_D, msg_status_2_D);      
    }       


    /**
     * @description Consulta o usuário no banco de dados pelo cpf e senha.
     * @param {String  } cpf, cpf do usuário
     * @param {String  } senha, senha do usuário
     * @returns  usuário cadastrado no banco de dados.
     */
    async findUserForLogin(cpf , senha){

        let cSql    =  "SELECT cpf,  "
                    +  "       nome, "
                    +  "       perfil" 
                    +  " FROM usuario "
                    +  " WHERE cpf   = TRIM( $1 ) "
                    +  "   AND senha = TRIM( $2 ) "
                    +  "   AND bloqueado = false  ";
                    
        let aValues = [ 
                        cpf  ,
                        senha
                      ];

       //Executa a query e ja retorna o usuário               
       return topConnection.executaQueryAsync(cSql, aValues, msg_status_1_D, msg_status_2_D);            
    }   

}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return usuarioDAO;
}