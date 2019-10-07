const auth = require('./../controllers/login');

module.exports = function(application){

    application.post("/api/resposta-formulario", auth.verifyJWT, function(req, res){

         application.app.controllers.respostaFormulario.salvaRespostaFormulario(application, req, res );
    });

    application.get("/api/relatorio/resposta-formulario/vistorias-realizadas/:daEmissao/:ateEmissao/:formulario", auth.verifyJWT, function(req, res){

        application.app.controllers.respostaFormulario.getVistoriasRealizadas(application, req, res );
   });

   application.get("/api/relatorio/resposta-formulario2/vistorias-realizadas/:ano/:mes/:dia", auth.verifyJWT, function(req, res){
       
        application.app.controllers.respostaFormulario.getVistoriasRealizadasEVistoriasComInconformes(application, req, res);
   });

}