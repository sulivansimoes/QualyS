const auth = require('./../controllers/login');

module.exports = function(application){

    application.post("/api/usuario", auth.verifyJWT, function(req, res){

         application.app.controllers.usuario.salvaUsuario(application, req, res );
    });


    application.put("/api/usuario", auth.verifyJWT, function(req, res){

        application.app.controllers.usuario.atualizaUsuario(application, req, res );
    });


    application.delete("/api/usuario/:cpf", auth.verifyJWT, function(req, res){

        application.app.controllers.usuario.deletaUsuario(application, req, res );
    });


    application.get("/api/usuario", auth.verifyJWT, function(req, res){

        application.app.controllers.usuario.getAllUsuarios(application, req, res );
    });


    application.get("/api/usuario/:nome", auth.verifyJWT, function(req, res){

        application.app.controllers.usuario.getUsuariosPorNome(application, req, res );
    });    
    
}