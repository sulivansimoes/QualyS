module.exports = function(application){

    application.post("/api/local", function(req, res){

         application.app.controllers.local.salvaLocal(application, req, res );
    });


    application.put("/api/local", function(req, res){

        application.app.controllers.local.atualizaLocal(application, req, res );
    });


    application.delete("/api/local/:id", function(req, res){

        application.app.controllers.local.deletaLocal(application, req, res );
    });

    
    application.get("/api/local", function(req, res){

        application.app.controllers.local.getAllLocais(application, req, res );
    });


    application.get("/api/local/:descricao", function(req, res){

        application.app.controllers.local.getLocaisPorDescricao(application, req, res );
    });
    
}