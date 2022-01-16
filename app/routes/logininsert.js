module.exports = function(app){

  app.post('/logininsert', function(req,res){

    const email      = req.body.data.email;
    const password   = req.body.data.password;

    let status = {};
    const conn   = app.config.supa();

    const main = async function (){

      let { data , error } = await conn.from("users").insert(req.body.data);

      if(error){

        if(error.message.indexOf('duplicate key value violates unique constraint "users_email_key"')>-1){

          status.status="607";

        }else{

          status.status="0";

        }

      }else{

        let { data, error } = await conn.from('view_login').select('*').eq('email',email).eq('password',password)

          
        status=data[0];

        status.user.session = await insertSession(status.id);

        delete status.id;
        delete status.password;

        status.status="1"; 
        
        

        //console.log(status);

      }
  
      res.send(status);

    }

    main();

    const insertSession = async function (id){

      const uuid      = require('uuid');
      const requestIp = require('request-ip');

      const sessions = {};
            sessions.ip    = requestIp.getClientIp(req);
            sessions.users = id;
            sessions.agent = req.get('User-Agent');
            sessions.uuid  = uuid.v4();
       
            await conn.from('sessions').insert(sessions);

            return sessions.uuid;
            
    }
    
  });

};