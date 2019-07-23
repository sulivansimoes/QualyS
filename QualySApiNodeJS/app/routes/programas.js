module.exports = function(application){

    application.post("/api/programas", function(req, res){

         application.app.controllers.programas.salvaPrograma(application, req, res );
    });


    application.put("/api/programas", function(req, res){

        application.app.controllers.programas.atualizaPrograma(application, req, res );
    });


    application.delete("/api/programas/:id", function(req, res){

        application.app.controllers.programas.deletaPrograma(application, req, res );
    });


    application.get("/api/programas", function(req, res){

        application.app.controllers.programas.getAllProgramas(application, req, res );
    });
    

    application.get("/api/programas/:descricao", function(req, res){

        application.app.controllers.programas.getProgramasPorDescricao(application, req, res );
    });    
    
}