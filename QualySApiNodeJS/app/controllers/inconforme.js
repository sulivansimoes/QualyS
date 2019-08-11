//Bibliotecas
const validator_interno = require("../libs/validators");
const {msg_status_3_A}  = require("../libs/mensagens_padroes");


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllInconformes(application, request, response){

    let modelInconforme = null;

    modelInconforme = new application.app.models.inconformeDAO();   //Instanciando model da inconforme
    modelInconforme.getAllInconformes(response);       

}


/**
 * @description : Pega dados do request, valida, e envia para o model salvar a correção do inconforme.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function corrigeInconforme(application, request, response){

    let idInconforme      = request.body.id_cadastro_formulario;
    let itemIconforme     = request.body.item;
    let emissao           = request.body.emissao;
    let hora              = request.body.hora;
    let dataCorrecao      = request.body.data_correcao;
    let acaoCorretiva     = request.body.acao_corretiva;
    let modelInconforme   = null;
    let erros_aux         = null;
    let erros             = [];
        
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({ 
                                                  data_correcao:dataCorrecao,
                                                  acao_corretiva:acaoCorretiva
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


    modelInconforme = new application.app.models.inconformeDAO();   //Instanciando model da inconforme
    modelInconforme.corrigeInconforme(response, idInconforme, itemIconforme, emissao, hora, acaoCorretiva, dataCorrecao);       
}


/**
 * @description : Pega dados do request, valida, e envia para o model estornar a ação corretiva que já foi tomada.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function estornaAcaoCorretiva(application, request, response){

    let idInconforme      = request.body.id_cadastro_formulario;
    let itemIconforme     = request.body.item;
    let emissao           = request.body.emissao;
    let hora              = request.body.hora;
    let modelInconforme   = null;
    let erros_aux         = null;
    let erros             = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    // erros_aux = validator_interno.isObjectEmpty({ 
    //                                               data_correcao:dataCorrecao,
    //                                               acao_corretiva:acaoCorretiva
    //                                             });
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


    modelInconforme = new application.app.models.inconformeDAO();   //Instanciando model da inconforme
    modelInconforme.estornaAcaoCorretiva(response, idInconforme, itemIconforme, emissao, hora);       
}


/**
 * Exportando funções 
 */
module.exports = {
    getAllInconformes   ,
    corrigeInconforme   ,
    estornaAcaoCorretiva,
    // atualizaLocal,
    // deletaLocal  ,
    // getAllLocais ,
    // getLocaisPorDescricao,
}