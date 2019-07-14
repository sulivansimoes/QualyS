//Bibliotecas
const validator_interno = require("../libs/validators");
const {msg_status_3_A}  = require("../libs/mensagens_padroes");


/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function salvaLocal(application, request, response){

    let dados       = request.body;
    let modelLocal  = null;
    let erros_aux   = null;
    let erros       = [];
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados, ["id"]);
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
        
     modelLocal = new application.app.models.localDAO();   //Instanciando model da local
     modelLocal.salvaLocal(dados, response);               //Enviando local para o model para ser salva.    
};


/**
 * @description : Pega dados do request, valida, e envia para o model atualizar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function atualizaLocal(application, request, response){

    let dados       = request.body;
    let modelLocal  = null;
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
          
    modelLocal = new application.app.models.localDAO();   //Instanciando model do local
    modelLocal.atualizaLocal(dados, response);            //Enviando local para o model para ser salva.
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaLocal(application, request, response){

    let idLocal    = Number.parseInt(request.body.id);
    let modelLocal = null;
    let erros      = null;
           
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    if ( Number.isNaN( idLocal ) ){

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

    modelLocal = new application.app.models.localDAO();   //Instanciando model do local
    modelLocal.deletaLocal(idLocal, response);            //Enviando local para o model para ser salva.    
};


/**
 * Exportando funções 
 */
module.exports = {
    salvaLocal   ,
    atualizaLocal,
    deletaLocal  ,
}

