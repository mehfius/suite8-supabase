module.exports = function(app){

  const getUser = async function(session){

    const conn     = app.config.supa();

    let { data, error } = await conn.from('sessions').select('users').eq('uuid',session);

    return data[0].users;

  };

  const deleteFile = async function(users,filename){

    const conn     = app.config.supa();

    let { data, error } = await conn.from('files').delete().match({ users: users,filename: filename })

    return data;

  };

  app.post('/deletefile', async function(req,res){

    const conn     = app.config.supa();
    const session  = req.body.session;
    const filename = req.body.filename;

    const users    = await getUser(session);
    
    var match = {};

        match.filename = filename;
        match.users    = users;

    const { data, error } = await conn.from('files').delete().match(match);

    res.send(data);

  });
  
}