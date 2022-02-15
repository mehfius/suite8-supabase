const log = async function (body,called){

  const { createClient } = require("@supabase/supabase-js");

  var connSupa = function () {

    return createClient(process.env['url'],process.env['anom_key'])

  };

  const conn      = connSupa();

  const uuid      = require('uuid');
  const requestIp = require('request-ip');
 

  const sessions  = {};

    sessions.modules = body.modules;

    sessions.body    = body;
    sessions.called    = called;
    //sessions.agent = req.get('User-Agent');
    sessions.sessions   = body.session;

    let { data, error } = await conn.from('log').insert(sessions);

    if(error){

      console.log(error);
      console.log(body);
      
    }
        
}
 
module.exports = function () {

  return log;

};
