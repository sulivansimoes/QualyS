const auth = require('./../controllers/login');

module.exports = function(application){


    application.put("/api/inconforme/correcao", auth.verifyJWT, function(req, res){

       application.app.controllers.inconforme.corrigeInconforme(application, req, res );
    });

    application.put("/api/inconforme/estorno", auth.verifyJWT, function(req, res){

        application.app.controllers.inconforme.estornaAcaoCorretiva(application, req, res );
    });
    
    application.get("/api/inconforme", auth.verifyJWT, function(req, res){

         application.app.controllers.inconforme.getAllInconformes(application, req, res );
    });

    application.get("/api/inconforme/:dataEmissao", auth.verifyJWT, function(req, res){

        application.app.controllers.inconforme.getInconformesPorDataDeEmissao(application, req, res );
    });

}