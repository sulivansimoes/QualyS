const auth = require('./../controllers/login');

module.exports = function(application){

    application.post("/api/local", auth.verifyJWT, function(req, res){

         application.app.controllers.local.salvaLocal(application, req, res );
    });


    application.put("/api/local", auth.verifyJWT, function(req, res){

        application.app.controllers.local.atualizaLocal(application, req, res );
    });


    application.delete("/api/local/:id", auth.verifyJWT, function(req, res){

        application.app.controllers.local.deletaLocal(application, req, res );
    });

    
    application.get("/api/local", auth.verifyJWT, function(req, res){

        application.app.controllers.local.getAllLocais(application, req, res );
    });


    application.get("/api/local/:descricao", auth.verifyJWT, function(req, res){

        application.app.controllers.local.getLocaisPorDescricao(application, req, res );
    });
    
}