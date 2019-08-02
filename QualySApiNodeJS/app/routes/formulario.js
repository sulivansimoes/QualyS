
module.exports = function(application){

    application.post("/api/formulario", function(req, res){

         application.app.controllers.formulario.salvaFormulario(application, req, res );
    });


    application.put("/api/formulario", function(req, res){

        application.app.controllers.formulario.atualizaFormulario(application, req, res );
    });


    application.delete("/api/formulario/:id", function(req, res){

        application.app.controllers.formulario.deletaFormulario(application, req, res );
    });
    

    application.get("/api/formulario", function(req, res){

        application.app.controllers.formulario.getAllCabecalhoFormularios(application, req, res );
    });


    application.get("/api/formulario/:id", function(req, res){

        application.app.controllers.formulario.findItensFormularioPorId(application, req, res );
    });


    application.get("/api/formulario/descricao/:descricao", function(req, res){

        application.app.controllers.formulario.getCabecalhoFormularioPorDescricao(application, req, res );
    });

    
    application.get("/api/formulario/id/:id", function(req, res){

        application.app.controllers.formulario.findFormularioPorId(application, req, res );
    });
}