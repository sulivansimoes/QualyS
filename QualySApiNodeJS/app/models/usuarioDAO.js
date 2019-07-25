//Bibliotecas
const topConnection                    = require("./processosPG");
const {msg_status_1_A, msg_status_2_A} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_B, msg_status_2_B} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_C, msg_status_2_C} = require("./../libs/mensagens_padroes"); 
const {msg_status_1_D, msg_status_2_D} = require("./../libs/mensagens_padroes"); 

class usuarioDAO{

    /**
     * @constructor
     */
    constructor(){
                 
    }


    /**
     * @description : Salva novo usuario no banco de dados.
     * @param programa, objeto contendo informações do novo usuario que deverá ser salvo.
     * @param response, objeto de response da requisição.
     * @obs   o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    salvaUsuario(usuario, response){

        let cSql    = "INSERT INTO usuario(cpf, nome, email, senha, assinatura, bloqueado) "
                    + " VALUES(                    " 
                    + "         TRIM($1)         , "   //[01]-cpf                          
                    + "         TRIM($2)         , "   //[02]-nome
                    + "         LOWER( TRIM($3) ), "   //[03]-email
                    + "         TRIM($4)         , "   //[04]-senha
                    + "         TRIM($5)         , "   //[05]-assinatura (diretório contendo imagem)
                    + "         $6                 "   //[06]-bloqueado
                    + "        )                   "

        let aValues = [ 
                        usuario.cpf         ,   //[01]
                        usuario.nome        ,   //[02]
                        usuario.email       ,   //[03]
                        usuario.senha       ,   //[04]
                        usuario.assinatura  ,   //[05]
                        usuario.bloqueado   ,   //[06]
                      ];

        topConnection.executaQuery(cSql, aValues, response, msg_status_1_A, msg_status_2_A);
    }


    /**
     * @description: Atualiza usuario no banco de dados.
     * @param {*} local, id do usuario que deve ser alterado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    atualizaUsuario(usuario, response){
       
        let cSql    = "UPDATE usuario SET "
                    + " nome       = TRIM($1)         , "   //[01]-nome                              
                    + " email      = LOWER( TRIM($2) ), "   //[02]-email      
                    + " senha      = TRIM($3)         , "   //[03]-senha        
                    + " assinatura = TRIM($4)         , "   //[04]-assinatura (diretório contendo imagem)       
                    + " bloqueado  = $5                 "   //[05]-bloqueado      
                    + " WHERE cpf  = TRIM($6)           "   //[06]-cpf
                    

        let aValues = [ 
                        usuario.nome        ,   //[01]
                        usuario.email       ,   //[02]
                        usuario.senha       ,   //[03]
                        usuario.assinatura  ,   //[04]
                        usuario.bloqueado   ,   //[05]
                        usuario.cpf         ,   //[06]
                      ];

        topConnection.executaQuery(cSql, aValues, response, msg_status_1_C, msg_status_2_C);
    }
    

    /**
     * @description: Deleta usuario do banco de dados.
     * @param {*} cpf, cpf do usuario que deve ser deletado.
     * @param response, objeto de response da requisição.
     * @obs : o response vem para o model em vez de ser tratado no controller por conta da forma assíncrona que o nodeJS trabalha.
     */
    deletaUsuario(cpf, response){

        let cSql    = "DELETE FROM usuario WHERE cpf = TRIM($1)";
        let aValues = [ cpf ];
        
        topConnection.executaQuery(cSql, aValues, response, msg_status_1_B, msg_status_2_B);      
    }


    /**
     * @description Consulta todos os usuarios no banco de dados
     * @param {response} response 
     */
    getAllUsuarios(response){

        let cSql    =  "SELECT cpf, "
                    +  "       nome," 
                    +  "       email,"
                    +  "       assinatura,"
                    +  "       bloqueado "
                    +  " FROM usuario "
                    +  " ORDER BY nome "

        topConnection.executaQuery(cSql, [],  response, msg_status_1_D, msg_status_2_D);      
    }


    /**
     * @description Consulta os usuarios no banco de dados por descrição
     * @param {String  } nome, nome à ser pesquisado.
     * @param {response} response 
     */
    getUsuariosPorNome(nome , response){

        let cSql    =  "SELECT cpf, "
                    +  "       nome," 
                    +  "       email,"
                    +  "       assinatura,"
                    +  "       bloqueado "
                    +  " FROM usuario "
                    +  " WHERE nome LIKE ('%' || $1 || '%')"
                    +  " ORDER BY nome "
                    
        let aValues = [ nome ];

        topConnection.executaQuery(cSql, aValues,  response, msg_status_1_D, msg_status_2_D);      
    }       

}


/**
 * Exportando instancia da classe
 */
module.exports = function(){
    return usuarioDAO;
}