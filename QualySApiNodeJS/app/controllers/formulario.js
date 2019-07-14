//Bibliotecas
const validator_interno = require("../libs/validators");
const {msg_status_3_A}  = require("../libs/mensagens_padroes");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaFormulario(application, request, response){

    let dados           = request.body;
    let modelFormulario = null;
    let connection      = null;    
    let erros_aux       = null;
    let erros           = [];
    
    console.log(dados)

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados, ["id_programa","item"]);
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
        
     modelFormulario = new application.app.models.formularioDAO( connection );   //Instanciando model da formulario, passando a instancia de conexão com banco de dados.
     modelFormulario.salvaFormulario(dados, response);                           //Enviando formulario para o model para ser salva.
    
};


/**
 * Exportando funções 
 */
module.exports = {
    salvaFormulario   ,
  //  atualizaFormulario,
  //  deletaFormulario  ,
}
