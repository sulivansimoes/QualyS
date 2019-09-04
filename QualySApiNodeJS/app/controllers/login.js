//Bibliotecas
const validator_interno  = require("./../libs/validators");
const { msg_status_3_A } = require("./../libs/mensagens_padroes");
const { msg_status_3_B } = require("./../libs/mensagens_padroes");
const jwt                = require('jsonwebtoken');

// carrega arquivos .env & .env.exemple que estão na raiz do projeto.
require("dotenv-safe").config();

/**
 * @description : Pega dados do request, valida, e envia para o model pesquisar e assim ver se pode efetuar login.
 * @param : application, aplicação servidora do express.
 * @param : request, objeto do request.
 * @param : response, objeto do response.
 * @Obs   : Esse controller foi implementado de forma diferente dos demais controllers da aplicação,
 *          nele foi usado o await para poder tratar a forma assincrona do  JavaScript e poder responder as requisições pelo controller.
 */
function login(application, request, response){

    let dados        = request.body
    let modelUsuario = null;
    let usuario      = null;
    let erros_aux    = null;
    let erros        = [];
    
    
    //-----------------------------------------------------
    // Validando informações 
    //-----------------------------------------------------
    erros_aux = validator_interno.isObjectEmpty({"cpf":dados.cpf, "senha":dados.senha});
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

    //Criptografo a senha oriunda da requisição antes de validar

    //Instanciando model do usuario
    modelUsuario = new application.app.models.usuarioDAO();   
    
    (async() => {
        console.log(usuario)

        //Recupera o usuario do banco se ele existir e a senha for válida e ele não estiver bloqueado.
        usuario =  await modelUsuario.findUserForLogin(dados.cpf, dados.senha) ;   
        
        console.log("usuario autenticado - " , usuario)

        //Caso o usuário exista e a senha estiver Ok
        if(usuario.length > 0 ){
            
            //monta payload
            let cpf   = usuario[0].cpf;
            let nome  = usuario[0].nome;
            
            let token = jwt.sign({ cpf, nome }, process.env.SECRET, {
                expiresIn: "10h" // expires in 10 horas
            });
            response.status(200).json({ auth: true, token: token });

        }else {

            response.status(401).json({
                                        status:3,
                                        mensagem:msg_status_3_B
                                      });
        }

    })().catch(e => console.error(e));

}

/**
 * Exportando funções 
 */
module.exports = {
    login   ,
}