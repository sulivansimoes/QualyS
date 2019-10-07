//Bibliotecas
const validator_interno = require("../libs/validators");
const {msg_status_3_A}  = require("../libs/mensagens_padroes");

/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaRespostaFormulario(application, request, response){

    let dados           = request.body;
    let modelRespostasFormulario = null;
    let connection      = null;    
    let erros_aux       = null;
    let erros           = [];
    
    console.log(dados)

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    //validando cabecalho
    // erros_aux = validator_interno.isObjectEmpty(dados, ["id_programa","itens","bloqueado"]);
    // if( erros_aux ){

    //     erros.push(erros_aux);
    //     erros_aux = null;
    // }

    // //Validando itens
    // for(let item in dados.itens){

    //     // erros_aux = validator_interno.isObjectEmpty(dados.itens[item], ["bloqueado"]);
    //     if( erros_aux ){
    
    //         erros.push(erros_aux);
    //         erros_aux = null;
    //     }
    // }

 
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
        
    modelRespostasFormulario = new application.app.models.respostaFormularioDAO( connection );   //Instanciando model respostas do formulario, passando a instancia de conexão com banco de dados.
    modelRespostasFormulario.salvaRespostasFormulario(dados, response);                           //Enviando formulario para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getVistoriasRealizadas(application, request, response){
  
    let daEmissao                 = request.params.daEmissao;
    let ateEmissao                = request.params.ateEmissao;
    let formulario                = request.params.formulario;
    let modelRespostasFormulario  = null;
    let erros_aux                 = null;
    let erros                     = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({
                                                    daEmissao:daEmissao, 
                                                    ateEmissao:ateEmissao, 
                                                    formulario:formulario
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
          
    modelRespostasFormulario = new application.app.models.respostaFormularioDAO();   
    modelRespostasFormulario.getVistoriasRealizadas(daEmissao, ateEmissao, formulario, response);         
}


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getVistoriasRealizadasEVistoriasComInconformes(application, request, response){

    let dia  = request.params.dia;
    let mes  = request.params.mes;
    let ano  = request.params.ano;
    let modelRespostasFormulario  = null;
    let erros_aux                 = null;
    let erros                     = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({ ano:ano });
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

    //faço uma conversão rapida / fazer algo melhor aqui depois.
    if(dia === 'null'){
        dia = null;
    }   
    if(mes === 'null'){
        mes = null;
    }
          
    modelRespostasFormulario = new application.app.models.respostaFormularioDAO();   
    modelRespostasFormulario.getVistoriasRealizadasEVistoriasComInconformes(ano, mes, dia,response);
}


/**
 * Exportando funções 
 */
module.exports = {
    salvaRespostaFormulario,
    getVistoriasRealizadas ,
    getVistoriasRealizadasEVistoriasComInconformes
}