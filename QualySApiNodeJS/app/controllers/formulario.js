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
    

    //-----------------------------------------------------
    // Transformando a string de itens em array de JSON
    //-----------------------------------------------------
    
    /**
     * @todo fazer uma livadação para ver se o schema é JSON antes de tentar fazer a
     * conversão
     */
    // dados.itens = eval(dados.itens);

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    //validando cabecalho
    // erros_aux = validator_interno.isObjectEmpty(dados, ["id_programa","itens","bloqueado"]);
    if( erros_aux ){

        erros.push(erros_aux);
        erros_aux = null;
    }

    //Validando itens
    for(let item in dados.itens){

        // erros_aux = validator_interno.isObjectEmpty(dados.itens[item], ["bloqueado"]);
        if( erros_aux ){
    
            erros.push(erros_aux);
            erros_aux = null;
        }
    }

    //-----------------------------------------------------
    // Se existir erros de validação
    //-----------------------------------------------------
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
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaFormulario(application, request, response){

    let idFormulario    = Number.parseInt(request.params.id);
    let modelFormulario = null;
    let connection      = null;  
    let erros           = null;
           
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    if ( Number.isNaN( idFormulario ) ){

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
       
    modelFormulario = new application.app.models.formularioDAO( connection );   //Instanciando model da formulario, passando a instancia de conexão com banco de dados.
    modelFormulario.deletaFormulario(idFormulario, response);                   //Enviando formulario para o model para ser deletado.

};


/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaFormulario(application, request, response){

    let dados            = request.body;
    let modelFormulario  = null;
    let erros_aux        = null;
    let erros            = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({
                                                  id : dados.id, 
                                                  descricao : dados.descricao,
                                                  id_local  : dados.id_local,
                                                  id_programa : dados.id_programa,
                                                  id_frequencia:dados.id_frequencia
                                                });
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
    modelFormulario.atualizaFormulario(dados, response);                        //Enviando formulario para o model para ser atualizado.          
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllCabecalhoFormularios(application, request, response){

    let modelFormulario = null;

    modelFormulario = new application.app.models.formularioDAO();   //Instanciando model do formulario
    modelFormulario.getAllCabecalhoFormularios(response);       
}


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getCabecalhoFormularioPorDescricao(application, request, response){

    let dados      = request.params;
    let modelFormulario = null;
    let erros_aux  = null;
    let erros      = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({descricao:dados.descricao});
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

    modelFormulario = new application.app.models.formularioDAO();                 //Instanciando model do formulario
    modelFormulario.getCabecalhoFormularioPorDescricao(dados.descricao, response);       

}


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function findItensFormularioPorId(application, request, response){

    let dados           = request.params;
    let modelFormulario = null;
    let erros_aux       = null;
    let erros           = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({id:dados.id});
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

    modelFormulario = new application.app.models.formularioDAO();   //Instanciando model do formulario
    modelFormulario.findItensFormularioPorId(dados.id, response);       

}



/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function findFormularioPorId(application, request, response){
    
    let dados           = request.params;
    let modelFormulario = null;
    let erros_aux       = null;
    let erros           = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({id:dados.id});
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

    modelFormulario = new application.app.models.formularioDAO();   //Instanciando model do formulario
    modelFormulario.findFormularioPorId(dados.id, response);       

}


/**
 * Exportando funções 
 */
module.exports = {
    salvaFormulario   ,
    atualizaFormulario,
    deletaFormulario  ,
    getAllCabecalhoFormularios,
    findItensFormularioPorId  ,
    getCabecalhoFormularioPorDescricao,
    findFormularioPorId
}
