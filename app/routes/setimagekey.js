module.exports = function(app){


  app.post('/setimagekey', async function(req,res){

    const conn     = app.config.supa();
    const key      = req.body.key;
    const filename = req.body.filename;

    var match = {};

        match.filename = filename;


        //    match.key    = key;

        const { data, error } = await conn.from('files').update({key:key}).match(match);

        res.send(data);

  });
  
}