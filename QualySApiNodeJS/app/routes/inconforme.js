module.exports = function(application){


    application.put("/api/inconforme/correcao", function(req, res){

       application.app.controllers.inconforme.corrigeInconforme(application, req, res );
    });

    application.put("/api/inconforme/estorno", function(req, res){

        application.app.controllers.inconforme.estornaAcaoCorretiva(application, req, res );
    });
    
    application.get("/api/inconforme", function(req, res){

         application.app.controllers.inconforme.getAllInconformes(application, req, res );
    });

    application.get("/api/inconforme/:dataEmissao", function(req, res){

        application.app.controllers.inconforme.getInconformesPorDataDeEmissao(application, req, res );
    });

}