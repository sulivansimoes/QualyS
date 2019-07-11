//Bibliotecas
const validator_interno = require("./../libs/validators");
const {msg_status_3_A}  = require("./../libs/mensagens_padroes");


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
    let erros_aux       = null;
    let erros           = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados);
    if( erros_aux ){

        erros.push(erros_aux);
        erros_aux = null;
    }

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
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaFrequencia(application, request, response){

    let dados           = request.body;
    let modelFrequencia = null;
    let connection      = null;    
    let erros_aux       = null;
    let erros           = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados);
    if( erros_aux ){

        erros.push(erros_aux);
        erros_aux = null;
    }

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
    modelFrequencia.atualizaFrequencia(dados, response);                        //Enviando frequencia para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaFrequencia(application, request, response){

    let idFrequencia    = Number.parseInt(request.body.id);
    let modelFrequencia = null;
    let connection      = null;    
    let erros           = null;
           
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    if ( Number.isNaN( idFrequencia ) ){

        erros = ["id"];
    };

    if( erros ){

        response.status(422).json({ 
            status:3, 
            mensagem: msg_status_3_A,
            campos_numericos: erros
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
    salvaFrequencia   ,
    atualizaFrequencia,
    deletaFrequencia  ,
}