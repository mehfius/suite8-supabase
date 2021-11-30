module.exports = function(app){

  app.post('/login', function(req,res){

    const password = req.body.password;
    const email    = req.body.email;
    const suite    = req.body.suite;

    res.setHeader('Access-Control-Allow-Origin', '*');

    var connection = app.config.supa();

    const main = async function (){

      let { data, error } = await connection.from('view_login').select('id,user,nav').eq('email',req.body.email).eq('password',req.body.password)
/* 
    let { data, error } = await connection.from('users').select('id,label,files,premium,areas(id,label,areasmodules(modules(id,label,url,premium,groups(id,label))))').eq('email',req.body.email).eq('password',req.body.password)
 */   

      console.log(error);
      console.log("Logado: "+data.length);
      console.log("Email: "+req.body.email);

       if(data.length==0){
        
        res.send(JSON.parse('[{"status":"504"}]')); 

      }else{

        //const send = await convert(data[0]);
        data[0].user.session = await insertSession(data[0].id);

        delete data[0].id 

        const send = data[0];

        send.status=1;

        res.send(send); 

      }

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

            await connection.from('sessions').insert(sessions);

            return sessions.uuid;
            
    }

  });

};