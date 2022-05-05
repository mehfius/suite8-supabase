const now = new Date(new Date()-3600*1000*3).toISOString();

module.exports = function(app){

  app.post('/formsave', function(req,res){

    const save = async function(modules,json){

      if(modules=="prontuarios"){
        
        json.share = (json.share)?JSON.parse(json.share):null;
        json.users = json.info.users;

        if(json.info.areas==50){

          json.medicos=json.users;

        }else if(json.info.areas==100){

          json.pacientes=json.users;

        }

        if(!json.id){

          json.created_at=now;
          
        }

         json.update=now;

      }else if(modules=="mvb"){

      }else if(modules=="usersremedios"){
        
        json.users  = json.info.users;
        json.update = now;
        
        console.log(json);
        
      }else if(modules=="users"){

         json.whatsapp = (json.whatsapp)?json.whatsapp.replace(/[^0-9]/g, ''):null;
         json.telefone = (json.telefone)?json.telefone.replace(/[^0-9]/g, ''):null;
         json.cep      = (json.cep)?json.cep.replace(/[^0-9]/g, ''):null;

      }

      delete json["info"];

      let { data , error } = await conn.from(modules).upsert(json);

      if(error){

        console.log(error);
        
      }
 
      return data;    
  
  };

    const getUser = async function(session){

      let { data, error } = await conn.from('view_sessions').select('users,areas').eq('uuid',session);

      return data[0];

    };

    const conn    = app.config.supa();

    app.config.log(req.body,"formsave.js");

    const json    = req.body.data;

    const id      = json.id;
    const session = req.body.session;
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