const auth = require('./../controllers/login');

module.exports = function(application){

    application.post("/api/frequencia", auth.verifyJWT, function(req, res){

         application.app.controllers.frequencia.salvaFrequencia(application, req, res );
    });


    application.put("/api/frequencia", auth.verifyJWT, function(req, res){

        application.app.controllers.frequencia.atualizaFrequencia(application, req, res );
    });


    application.delete("/api/frequencia/:id", auth.verifyJWT, function(req, res){

        application.app.controllers.frequencia.deletaFrequencia(application, req, res );
    });


    application.get("/api/frequencia", auth.verifyJWT, function(req, res){

        application.app.controllers.frequencia.getAllFrequencias(application, req, res);
    });


    application.get("/api/frequencia/:descricao", auth.verifyJWT, function(req, res){

        application.app.controllers.frequencia.getFrequenciasPorDescricao(application, req, res);
    });
    
}