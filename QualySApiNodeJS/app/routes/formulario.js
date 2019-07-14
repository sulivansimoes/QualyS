
module.exports = function(application){

    application.post("/api/formulario", function(req, res){

         application.app.controllers.formulario.salvaFormulario(application, req, res );
    });


    application.put("/api/formulario", function(req, res){

        application.app.controllers.formulario.atualizaFormulario(application, req, res );
    });


    application.delete("/api/formulario", function(req, res){

        application.app.controllers.formulario.deletaFormulario(application, req, res );
    });
    
}