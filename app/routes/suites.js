module.exports = function(app){

  app.post('/suites', function(req,res){

    var connection = app.config.supa();

    const main = async function (){

      let { data, error } = await connection.from('suites').select(`id,label,url,suites_config(label,url)`).eq('id','1');

      res.render("suites/index", {suites : data});

    }

    main();

  });

};