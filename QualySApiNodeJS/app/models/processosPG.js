
//Bibliotecas
const postgreSQL = require("./../../config/dbConnectionPg");

/**
 * @description Executa query no banco de dados PostegreSQL
 * @param {String  } cSql, query à ser executada
 * @param {Array   } aValues, array contendo valores a serem substituidos nos parametros [ $ ]
 * @param {Response} response, objeto de response do request. 
 * @param {String  } cMensagemSucesso, mensagem que deve ser enviada no response caso a execução da query obtenha exito
 * @param {String  } cMensagemErro, mensagem que deve ser enviada no response caso a execução da query gere erros
 * @see https://node-postgres.com/features/queries
 * 
 * @example
 * executaQuery("INSERT INTO frequencia(descricao) VALUES ( $1 )", ['mensal'], response, 'insert deu certo', 'insert deu errado'); 
 */
function executaQuery(cSql, aValues, response, cMensagemSucesso, cMensagemErro){
         
    let connection = null;

    connection = new postgreSQL.ConnectionPostgreSQL();   //Instanciando classe.
    connection = connection.openPoolConnection();         //Abrindo conexão com banco de dados.

    connection.query(cSql, aValues)
              .then( ()    => {   
                                    response.status(200).json({ 
                                                                status:1, 
                                                                mensagem:cMensagemSucesso
                                                             });
                              })
              .catch(erros => {                                             
                                    response.status(500).json({ 
                                                                status:2, 
                                                                mensagem:cMensagemErro + erros 
                                                             });
                              })
              .finally(()  => {
                                    this._connection.end();
                              });
}

module.exports = {
    executaQuery,
}