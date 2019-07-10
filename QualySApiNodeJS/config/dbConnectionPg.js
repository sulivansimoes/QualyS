//Bibliotecas
const { Pool, Client } = require('pg');

/**
 * @description : Classe contendo métodos responsáveis por abrir conexões no o banco de dados PostgreSQL
 * @see         : https://node-postgres.com/features/connecting
 */
class ConnectionPostgreSQL{
    
    /**
     * @constructor Instancia a classe contendo configurações necessárias para possibilitar uma futura conexão.
     */
    constructor(){

        this._config = {

            user     : "postgres"  , 
            host     : "localhost" ,
            database : "qualys"    ,
            password : "abc123"    ,
            port     : 5432
        };
    };

    /**
     * @description : Função abre uma conexão com PostgreSQL em modo Client
     */
    openClientConnection(){

        console.log("Abrindo conexão no PostgreSql em modo client");
        return new Client(this._config);
    };
    

    /**
     * @description : Função abre uma conexão com PostgreSQL em modo Pool
     */
    openPoolConnection(){
        
        console.log("Abrindo conexão no PostgreSql em modo pool");
        return new Pool(this._config);
    };
}


/**
 * Exportando classe para uso externo.
 */
module.exports = {
    ConnectionPostgreSQL
}