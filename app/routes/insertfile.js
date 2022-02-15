module.exports = function(app){

  app.post('/insertfile', function(req,res){

    const conn     = app.config.supa();

    
    const session  = req.body.session;
    const filename = req.body.filename;
    const anexos   = req.body.anexos;

    const main = async function (){

      const getUser = async function(session){

        let { data, error } = await conn.from('sessions').select('users').eq('uuid',session);

        return data[0].users;

      };

      const insertFile = async function(users,filename,anexos){

        const json  = JSON.parse('{"filename":"'+filename+'","anexos":"'+anexos+'","users":"'+users+'"}');


        let { data , error } = await conn.from('files').insert(json);

        res.send(JSON.parse('{"status":"1"}'));

      };

      const users = await getUser(session);

      insertFile(users,filename,anexos)

    }

    main();



  });
  
}