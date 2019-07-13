//Bibliotecas
const crypto            = require("crypto");
const validator_interno = require("../libs/validators");
const {msg_status_3_A}  = require("../libs/mensagens_padroes");


/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 * @see   : https://nodejs.org/api/crypto.html#crypto_crypto
 */
function salvaUsuario(application, request, response){

    let dados       = request.body;
    let modelUsuario= null;
    let connection  = null;    
    let erros_aux   = null;
    let erros       = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados, ["id","email"]);
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
    

    //-----------------------------------------------------
    // Criptografando senha.
    //-----------------------------------------------------
    dados.senha = crypto.createHash('MD5')
                        .update(dados.senha)
                        .digest('hex');

    modelUsuario = new application.app.models.usuarioDAO( connection );   //Instanciando model do usuario, passando a instancia de conexão com banco de dados.
    modelUsuario.salvaUsuario(dados, response);                           //Enviando usuario para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaUsuario(application, request, response){

    let dados       = request.body;
    let modelUsuario= null;
    let connection  = null;    
    let erros_aux   = null;
    let erros       = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados,["email"]);
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
        
    
    //-----------------------------------------------------
    // Criptografando senha.
    //-----------------------------------------------------
    dados.senha = crypto.createHash('MD5')
                         .update(dados.senha)
                         .digest('hex');

    connection = application.config.dbConnectionPg;      //Resgatando classe do arquivo.
    connection = new connection.ConnectionPostgreSQL();  //Instanciando classe resgatada.
    
    modelUsuario = new application.app.models.usuarioDAO( connection );   //Instanciando model do usuario, passando a instancia de conexão com banco de dados.
    modelUsuario.atualizaUsuario(dados, response);                        //Enviando usuario para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaUsuario(application, request, response){

    let cpf        = request.body.cpf;
    let modelLocal = null;
    let connection = null;    
    let erros       = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty( { cpf: cpf }, [] );
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
        
    modelLocal = new application.app.models.usuarioDAO( connection );   //Instanciando model do usuario, passando a instancia de conexão com banco de dados.
    modelLocal.deletaUsuario(cpf, response);                            //Enviando usuario para o model para ser salva.
    
};


/**
 * Exportando funções 
 */
module.exports = {
    salvaUsuario   ,
    atualizaUsuario,
    deletaUsuario  ,
}