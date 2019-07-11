
module.exports = function(application){

    application.post("/api/frequencia", function(req, res){

         application.app.controllers.frequencia.salvaFrequencia(application, req, res );
    });


    application.put("/api/frequencia", function(req, res){

        application.app.controllers.frequencia.atualizaFrequencia(application, req, res );
    });


    application.delete("/api/frequencia", function(req, res){

        application.app.controllers.frequencia.deletaFrequencia(application, req, res );
    });
    
}