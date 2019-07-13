module.exports = function(application){

    application.post("/api/usuario", function(req, res){

         application.app.controllers.usuario.salvaUsuario(application, req, res );
    });


    application.put("/api/usuario", function(req, res){

        application.app.controllers.usuario.atualizaUsuario(application, req, res );
    });


    application.delete("/api/usuario", function(req, res){

        application.app.controllers.usuario.deletaUsuario(application, req, res );
    });
    
}