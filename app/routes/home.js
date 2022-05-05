module.exports = function(app){

  app.get('/', function(req,res){
          


    /*       const main = async function (){

            const conn   = app.config.supa();

            app.config.log(conn,req.body);
    




            res.send("ola");

    }(); */

    res.send("http on");

  });
    
};