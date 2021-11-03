module.exports = function(app){

    app.get('/suite', function(req,res){

        var connection = app.config.supa();

        const main = async function (){

          let { data, error } = await connection.from('suites').select('id,label,url,files,color1')
       res.setHeader('Access-Control-Allow-Origin', '*');
          res.render("home/index", {suites : data});

        }

        main();
    });

};