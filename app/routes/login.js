module.exports = function(app){

  app.post('/login', function(req,res){

    const password = req.body.password;
    const email    = req.body.email;
    const suite    = req.body.suite;

    res.setHeader('Access-Control-Allow-Origin', '*');

    var connection = app.config.supa();

    const main = async function (){

      let { data, error } = await connection.from('users').select('id,label,files,premium,areas(id,label,areasmodules(modules(id,label,url,premium,groups(id,label))))').eq('email',req.body.email).eq('password',req.body.password)

      console.log("Logado: "+data.length);
      console.log("Email: "+req.body.email);

      if(data.length==0){
        
        res.send(JSON.parse('[{"status":"504"}]')); 

      }else{

        const send = await convert(data[0]);

        send.status=1;

        res.send(send); 

      }

    }

    main();

    const convert = async function (data){
      
      let login = {}

      let user = {}

          //user.id      = data.id;
          user.label   = data.label;
          user.areas   = data.areas.id;
          user.premium = data.premium;
          user.profileimage   = await getProfileImage(data.files);
          user.session = await insertSession(data.id);

      login.user=user;    

      let nav = {}
          //console.log("Modulos: "+data.areas.areasmodules.length);
          nav = getModules(data.areas.areasmodules);

          
      //console.log(nav);
      login.nav=nav;       

      return login;
    }

    const getModules = function (data){
       
        let groups = getGroups(data);
        let modules = {};

        Object.entries(data).forEach(([key, value]) => {

          let groupsid    = value.modules.groups.id;
          let groupslabel = value.modules.groups.label;

          delete value.modules.groups;

          groups[groupsid].modules.push(value.modules);


        });

        return groups;

    }

    const getGroups = function (data){

      let group = {};
      //console.log(data);

       Object.entries(data).forEach(([key, value]) => {

          let groupsid    = value.modules.groups.id;
          let groupslabel = value.modules.groups.label;

          group[groupsid]={'id':groupsid,'label':groupslabel};
          group[groupsid].modules = [];

      });
       

      return group;
    }

    const getProfileImage = async function (files){

          let { data, error } = await connection.from('files').select('filename,key').eq('anexos',files);
       
          return data[0];

    }

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