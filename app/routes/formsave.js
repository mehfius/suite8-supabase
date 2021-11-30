module.exports = function(app){

  app.post('/formsave', function(req,res){

    const save = async function(modules,json){

      json.share = (json.share)?JSON.parse(json.share):null;
      json.users = json.info.users;

      if(json.info.areas==50){

        json.medicos=json.users;

      }else if(json.info.areas==100){

        json.pacientes=json.users;

      }

      delete json["info"];

      let { data , error } = await conn.from(modules).upsert(json);

      console.log(json);
      console.log(error);
 
      return data;    
  
    };

    const getUser = async function(session){

      let { data, error } = await conn.from('view_sessions').select('users,areas').eq('uuid',session);

      return data[0];

    };

    const conn    = app.config.supa();

    const json    = req.body.data;

    const id      = json.id;
    const session = json.session;
    const modules = json.modules;

    delete json["session"];
    delete json["modules"];

    const main = async function (){

      json.info = [];

      json.info = await getUser(session);

      let data = save(modules,json);

      res.send(JSON.parse('{"status":"1"}'));

    };

    main();

  });

}