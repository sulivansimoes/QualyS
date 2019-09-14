//Bibliotecas
const express    =  require("express");
const bodyParser =  require("body-parser");
const consign    =  require("consign");
const compression = require("compression");

//Executando objeto do express
var app = express();

//Configurações dos middlewares da aplicação
app.use(compression() );                                //Comprime todas as respostas em gzip / aumenta desempenho da aplicação
app.use(bodyParser.urlencoded( {extended :true} ) );
app.use(bodyParser.json() );

//Configuração de requisições
app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin"       ,"*");                        //Autorizando os métodos da API responderem para qualquer ORIGEM.
    res.setHeader("Access-Control-Allow-Methods"      ,"GET, POST, PUT, DELETE");   //Pré conifigura quais os métodos que a ORIGEM pode requisitar.
    res.setHeader("Access-Control-Allow-Headers"      ,"Content-Type");             //Habilita que as requisições feitas pela ORIGEM tenham cabeçalhos reescritos.
    res.setHeader("Access-Control-Allow-Credentials"  ,true);      
    next();
});

//Tratamento de erros
app.use((error, req, res, next)=>{
    res.status(error.statusCode).json({mensagem:"Erro interno no Servidor => "+error });
});

//Adicionando o consing na aplicação para os autoloads.
consign()
	.include('app/routes')
	.then('/config/dbConnectionPg.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);


/**
 * Exportando instancia do servidor configurado.
 */
module.exports = app; 