module.exports = function(application){

    application.post("/api/login", function(req, res){

         application.app.controllers.login.login(application, req, res );
    });
}    