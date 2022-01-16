module.exports = function(app){

  app.post('/select', function(req,res){

    const session  = req.body.session;
    const id       = req.body.id;
    const modules  = req.body.modules;
    const string  = req.body.string;

    const conn     = app.config.supa();

    const main     = async function (){

      let { data, error } = await conn.rpc('select_'+modules, { string: string });

      res.send(data);
       

    }

    main();

  });
  
}