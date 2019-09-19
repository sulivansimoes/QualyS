const auth = require('./../controllers/login');

module.exports = function(application){

    application.post("/api/programas", auth.verifyJWT, function(req, res){

         application.app.controllers.programas.salvaPrograma(application, req, res );
    });


    application.put("/api/programas", auth.verifyJWT, function(req, res){

        application.app.controllers.programas.atualizaPrograma(application, req, res );
    });


    application.delete("/api/programas/:id", auth.verifyJWT, function(req, res){

        application.app.controllers.programas.deletaPrograma(application, req, res );
    });


    application.get("/api/programas", auth.verifyJWT, function(req, res){

        application.app.controllers.programas.getAllProgramas(application, req, res );
    });
    

    application.get("/api/programas/:descricao", auth.verifyJWT, function(req, res){

        application.app.controllers.programas.getProgramasPorDescricao(application, req, res );
    });    
    
}