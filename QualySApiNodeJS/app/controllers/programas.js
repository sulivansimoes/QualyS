//Bibliotecas
const validator_interno = require("./../libs/validators");
const {msg_status_3_A}  = require("./../libs/mensagens_padroes");


/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaPrograma(application, request, response){

    let dados         = request.body;
    let modelPrograma = null;
    let connection    = null;    
    let erros_aux     = null;
    let erros         = [];
    
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
    
    //-----------------------------------------------------
    // Conversão do tipo de dados.
    //-----------------------------------------------------
    dados.data_vigencia = new Date( dados.data_vigencia );
    dados.data_revisao  = new Date( dados.data_revisao  );
    
    connection = application.config.dbConnectionPg;      //Resgatando classe do arquivo.
    connection = new connection.ConnectionPostgreSQL();  //Instanciando classe resgatada.
        
    modelPrograma = new application.app.models.programasDAO( connection );   //Instanciando model do programa, passando a instancia de conexão com banco de dados.
    modelPrograma.salvaPrograma(dados, response);                            //Enviando programa para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaPrograma(application, request, response){

    let dados          = request.body;
    let modelPrograma  = null;
    let connection     = null;    
    let erros_aux      = null;
    let erros          = [];
    
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

    //-----------------------------------------------------
    // Conversão do tipo de dados.
    //-----------------------------------------------------
    dados.data_vigencia = new Date( dados.data_vigencia );
    dados.data_revisao  = new Date( dados.data_revisao  );
           
    connection = application.config.dbConnectionPg;      //Resgatando classe do arquivo.
    connection = new connection.ConnectionPostgreSQL();  //Instanciando classe resgatada.
        
    modelPrograma = new application.app.models.programasDAO( connection );   //Instanciando model do programa, passando a instancia de conexão com banco de dados.
    modelPrograma.atualizaPrograma(dados, response);                         //Enviando programa para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaPrograma(application, request, response){

    let idPrograma     = Number.parseInt(request.body.id);
    let modelPrograma  = null;
    let connection     = null;    
    let erros          = null;
           
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    if ( Number.isNaN( idPrograma ) ){

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
        
    modelPrograma = new application.app.models.programasDAO( connection );    //Instanciando model do programa, passando a instancia de conexão com banco de dados.
    modelPrograma.deletaPrograma(idPrograma, response);                       //Enviando programa para o model para ser salva.
    
};


/**
 * Exportando funções 
 */
module.exports = {
    salvaPrograma   ,
    atualizaPrograma,
    deletaPrograma  ,
}