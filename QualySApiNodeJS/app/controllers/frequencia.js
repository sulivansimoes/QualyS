//Bibliotecas
var validator_interno = require("./../libs/validators");
var validator_externo = require("validator");
var {msg_status_3_A} = require ("./../libs/mensagens_padroes");


/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaFrequencia(application, request, response){

    let dados           = request.body;
    let modelFrequencia = null;
    let connection      = null;    
    let erros           = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros = validator_interno.isObjectEmpty(dados);   
    
    if (erros.length > 0){

        response.status(422).json({ 
                                    status:3, 
                                    mensagem: msg_status_3_A,
                                    campos_invalidos: erros
                                 });
        return; 
    }
        
    connection = application.config.dbConnectionPg;      //Resgatando classe do arquivo.
    connection = new connection.ConnectionPostgreSQL();  //Instanciando classe resgatada.
        
    modelFrequencia = new application.app.models.frequenciaDAO( connection );   //Instanciando model da frequencia, passando a instancia de conexão com banco de dados.
    modelFrequencia.salvaFrequencia(dados, response);                           //Enviando frequencia para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaFrequencia(application, request, response){

    let idFrequencia    = request.body.id;
    let modelFrequencia = null;
    let connection      = null;    
    let erros           = false;
           
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
  //  erros = !Number.isNaN(idFrequencia);
    console.log(Number.isNaN(idFrequencia));
    if( erros ){

        response.status(422).json({ 
            status:3, 
            mensagem: msg_status_3_A,
         //   campos_invalidos: erros
        });
        return; 
    }

    connection = application.config.dbConnectionPg;      //Resgatando classe do arquivo.
    connection = new connection.ConnectionPostgreSQL();  //Instanciando classe resgatada.
        
    modelFrequencia = new application.app.models.frequenciaDAO( connection );   //Instanciando model da frequencia, passando a instancia de conexão com banco de dados.
    modelFrequencia.deletaFrequencia(idFrequencia, response);                   //Enviando frequencia para o model para ser salva.
    
};


/**
 * Exportando funções 
 */
module.exports = {
    salvaFrequencia ,
    deletaFrequencia,
}