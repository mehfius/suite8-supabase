module.exports = function(app){

    app.get('/', function(req,res){

        var connection = app.config.supa();

        const main = async function (){

          let { data, error } = await connection.from('suites').select(`label,files,suites_config(label,url)`).like('url','https://doctor8dev2021.ga')

          res.render("home/index", {suites : data});

        }

        main();

    });
    
};