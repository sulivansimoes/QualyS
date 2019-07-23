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
    let erros_aux     = null;
    let erros         = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados, ["id", "data_vigencia", "data_revisao","bloqueado"],);
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
    
    modelPrograma = new application.app.models.programasDAO();   //Instanciando model do programa
    modelPrograma.salvaPrograma(dados, response);                //Enviando programa para o model para ser salvo.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaPrograma(application, request, response){

    let dados       = request.body;
    let erros_aux   = null;
    let erros       = [];
    
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
           
    modelPrograma = new application.app.models.programasDAO();   //Instanciando model do programa
    modelPrograma.atualizaPrograma(dados, response);             //Enviando programa para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaPrograma(application, request, response){

    let idPrograma     = Number.parseInt(request.params.id);
    let modelPrograma  = null;
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

    modelPrograma = new application.app.models.programasDAO();    //Instanciando model do programa.
    modelPrograma.deletaPrograma(idPrograma, response);           //Enviando programa para o model para ser salva.
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllProgramas(application, request, response){

    let modelPrograma = null;

    modelPrograma = new application.app.models.programasDAO();   //Instanciando model do programa
    modelPrograma.getAllProgramas(response);       

}


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getProgramasPorDescricao(application, request, response){

    let dados         = request.params;
    let modelPrograma = null;
    let erros_aux     = null;
    let erros         = [];

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

    modelPrograma = new application.app.models.programasDAO();                 //Instanciando model de programas
    modelPrograma.getProgramasPorDescricao(dados.descricao, response);       

}

/**
 * Exportando funções 
 */
module.exports = {
    salvaPrograma   ,
    atualizaPrograma,
    deletaPrograma  ,
    getAllProgramas ,
    getProgramasPorDescricao
}