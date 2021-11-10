module.exports = function(app){

  app.post('/login', function(req,res){

    res.setHeader('Access-Control-Allow-Origin', '*');

    var connection = app.config.supa();

    const main = async function (){

      let { data, error } = await connection.from('users').select(`id,label,areas`).eq('email',req.body.email).eq('password',req.body.password)

      if(data.length==0){
        
        data=JSON.parse('[{"status":"504"}]')

      }else{

        data[0].status = "1";
        data[0].session = await insertSession(data[0]);
        delete data[0].id;
        
      }
    
      res.send(data[0]);

    }

    main();

    const insertSession = async function (data){

      const uuid      = require('uuid');
      const requestIp = require('request-ip');

      const sessions = {};
            sessions.ip    = requestIp.getClientIp(req);
            sessions.users = data.id;
            sessions.agent = req.get('User-Agent');
            sessions.uuid  = uuid.v4();

            await connection.from('sessions').insert(sessions);

            return sessions.uuid;
            
    }

  });

};