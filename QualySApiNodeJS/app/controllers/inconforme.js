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
 * Exportando funções 
 */
module.exports = {
    getAllInconformes   ,
    // atualizaLocal,
    // deletaLocal  ,
    // getAllLocais ,
    // getLocaisPorDescricao,
}