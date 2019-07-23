
module.exports = function(application){

    application.post("/api/frequencia", function(req, res){

         application.app.controllers.frequencia.salvaFrequencia(application, req, res );
    });


    application.put("/api/frequencia", function(req, res){

        application.app.controllers.frequencia.atualizaFrequencia(application, req, res );
    });


    application.delete("/api/frequencia/:id", function(req, res){

        application.app.controllers.frequencia.deletaFrequencia(application, req, res );
    });


    application.get("/api/frequencia", function(req, res){

        application.app.controllers.frequencia.getAllFrequencias(application, req, res);
    });


    application.get("/api/frequencia/:descricao", function(req, res){

        application.app.controllers.frequencia.getFrequenciasPorDescricao(application, req, res);
    });
    
}