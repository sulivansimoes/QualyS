const auth = require('./../controllers/login');

module.exports = function(application){

    application.post("/api/resposta-formulario", auth.verifyJWT, function(req, res){

         application.app.controllers.respostaFormulario.salvaRespostaFormulario(application, req, res );
    });

    application.get("/api/resposta-formulario/vistorias-realizadas/:daEmissao/:ateEmissao/:formulario", auth.verifyJWT, function(req, res){

        application.app.controllers.respostaFormulario.getVistoriasRealizadas(application, req, res );
   });


    // application.put("/api/resposta-formulario", function(req, res){

    //     application.app.controllers.local.atualizaLocal(application, req, res );
    // });


    // application.delete("/api/resposta-formulario/:id", function(req, res){

    //     application.app.controllers.local.deletaLocal(application, req, res );
    // });

}