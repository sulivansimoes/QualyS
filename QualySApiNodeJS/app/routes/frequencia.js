
module.exports = function(application){

    application.post("/api", function(req, res){

         application.app.controllers.frequencia.salvaFrequencia(application, req, res );
    });

    application.delete("/api", function(req, res){

        application.app.controllers.frequencia.deletaFrequencia(application, req, res );
    });
    
    // app.put("/api/:id", controller.atualiza(app, req, res ));
    // app.delete("/api/:id", controller.deleta(app,req, res ));
    // app.get("/api/:id", controller.getForId(app, req, res ));
}