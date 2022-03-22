const now = new Date(new Date()-3600*1000*3).toISOString();

module.exports = function(app){

  app.post('/formdelete', function(req,res){

    const d = async function(modules,json){
      
      console.log(json);
      
      let { data , error } = await conn.from(modules).update({d:true}).match(json);

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

    //app.config.log(req.body,"formdelete.js");


    const main = async function (){
      
     const session = req.body.session;

      let json = [];
      
      let user       = await getUser(session);
      let modules    = req.body.modules;
      
      json.id    = req.body.id;
      json.users    = user.users;
      
     console.log(json);
      

      let data = d(modules,json);

      res.send(JSON.parse('{"status":"1"}'));

    };

    main();

  });

}