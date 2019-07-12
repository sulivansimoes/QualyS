module.exports = function(application){

    application.post("/api/programas", function(req, res){

         application.app.controllers.programas.salvaPrograma(application, req, res );
    });


    application.put("/api/programas", function(req, res){

        application.app.controllers.programas.atualizaPrograma(application, req, res );
    });


    application.delete("/api/programas", function(req, res){

        application.app.controllers.programas.deletaPrograma(application, req, res );
    });
    
}