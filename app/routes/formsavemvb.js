module.exports = function(app){

  const now     = new Date(new Date()-3600*1000*3).toISOString();

  app.post('/formsavemvb', function(req,res){

    const getUser = async function(session){
     
      const conn    = app.config.supa();
      let { data, error } = await conn.from('view_sessions').select('users,areas,jsonusers').eq('uuid',session);

      if(error){
      
        console.log(error);
        
      }

      return data[0];

    };

    const saveProntuarios = async function(json){

      const conn    = app.config.supa();

      let text ="";

      Object.entries(json.fieldlabel).forEach(([key, value]) => {

        if(json.fieldvalue[key]){
          text+=""+value.label+"\n";
          text+=value.value+"\n\n"; 
        }

      });

      json.label       = text;

      delete json.fieldlabel;
      delete json.fieldvalue;

      let { data , error } = await conn.from("prontuarios").upsert(json);

      if(error){
      
        console.log(error);
        
      }

    }

    const save = async function(){


      const conn    = app.config.supa();

      const json    = req.body.data;

      const user    = await getUser(req.body.session);

      const modules = json.modules;

      json.users = user.users;

      const fieldlabel = json.fieldlabel;


      delete json.fieldlabel;
      delete json.modules;
      delete json.session;

      let { data , error } = await conn.from(modules).upsert(json);

      if(error){

        console.log(error);
        
      }else{

        let cidade = user.jsonusers.cidade;

        let share = [user.users];

        let users = (cidade=='Uberaba')?13345:14804;

        let pacientes = user.users;

        let jsonProntuarios = {'share':share,'pacientes':pacientes,'users':users,'created_at':now,'update':now,'category':3000,'fieldlabel':fieldlabel}


        jsonProntuarios.fieldvalue = json;

        delete jsonProntuarios.fieldvalue.users;
        //delete jsonProntuarios.fieldvalue.consentimento;      
        //delete jsonProntuarios.fieldvalue.consentimentolivre;
        saveProntuarios(jsonProntuarios);

      }

      res.send(JSON.parse('{"status":"1"}'));

    };

    save();

  });

}