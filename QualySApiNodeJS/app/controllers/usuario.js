//Bibliotecas
const crypto            = require("crypto");
const base64ToImage     = require("base64-to-image");
const validator_interno = require("../libs/validators");
const {msg_status_3_A}  = require("../libs/mensagens_padroes");


/**
 * @description : Pega dados do request, valida, e envia para o model salvar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
 * @param : response, objeto do response.
 * @see   https://nodejs.org/api/crypto.html#crypto_crypto
 */
function salvaUsuario(application, request, response){

    let dados       = request.body;
    let modelUsuario= null;
    let erros_aux   = null;
    let erros       = [];
    
    console.log(dados)

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

    //-----------------------------------------------------
    // Desencriptando imagem da assinatura que veio 
    // em base64 e salvando no diretório.
    //-----------------------------------------------------
    // var base64Str = "data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACFSURBVChTY/z56/d/BiDY2JAAohi+swmB6bj6SWAaBpigNEHAxPL7KwMIh3obg/G/N3fBGB0QbSILExc/mHF53WIwLehUD6bRAdEmMu45ew3s66WnPoAFTNQFwLSUtCaYDlADUySYePvBI7CJl3/JgAUuHD0ApnWNrcF0iOY/ME2kiQwMAOHcJyk5DlsSAAAAAElFTkSuQmCC";
    let base64Str   = "data:image/png;base64,"+dados.assinatura;
    let path        = "./app/imagens_assinaturas/";
    let optionalObj = {'fileName': dados.cpf, 'type':'png'};
    
    base64ToImage(base64Str,path,optionalObj);
    
    // console.log(dados.assinatura);
    dados.assinatura = './imagens_assinaturas';
    

    //-----------------------------------------------------
    // Criptografando senha.
    //-----------------------------------------------------
    dados.senha = crypto.createHash('MD5')
                        .update(dados.senha)
                        .digest('hex');

    modelUsuario = new application.app.models.usuarioDAO();   //Instanciando model do usuario
    modelUsuario.salvaUsuario(dados, response);               //Enviando usuario para o model para ser salva.
    
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
    let erros_aux   = null;
    let erros       = [];
    console.log(request);
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty(dados,["email","senha","assinatura"]);
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
    //----------------------------------------------------
    if(dados.senha){
        dados.senha = crypto.createHash('MD5')
                            .update(dados.senha)
                            .digest('hex');
    }

    modelUsuario = new application.app.models.usuarioDAO();   //Instanciando model do usuario
    modelUsuario.atualizaUsuario(dados, response);                        //Enviando usuario para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model deletar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function deletaUsuario(application, request, response){

    let cpf        = request.params.cpf;
    let modelLocal = null;
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

    modelLocal = new application.app.models.usuarioDAO();   //Instanciando model do usuario
    modelLocal.deletaUsuario(cpf, response);                //Enviando usuario para o model para ser salva.
    
};


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getAllUsuarios(application, request, response){

    let modelUsuario = null;

    modelUsuario = new application.app.models.usuarioDAO();   //Instanciando model do usuario
    modelUsuario.getAllUsuarios(response);       

}


/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 */
function getUsuariosPorNome(application, request, response){

    let dados        = request.params;
    let modelUsuario = null;
    let erros_aux    = null;
    let erros        = [];

    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({nome:dados.nome});
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

    modelUsuario = new application.app.models.usuarioDAO();                 //Instanciando model do usuario
    modelUsuario.getUsuariosPorNome(dados.nome, response);       

}


/**
 * Exportando funções 
 */
module.exports = {
    salvaUsuario   ,
    atualizaUsuario,
    deletaUsuario  ,
    getAllUsuarios ,
    getUsuariosPorNome
}