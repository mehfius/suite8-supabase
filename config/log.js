const log = async function (conn,body,called){

  const uuid      = require('uuid');
  const requestIp = require('request-ip');
 

  const sessions  = {};

    sessions.modules = body.modules;

    sessions.body    = body;
    sessions.called    = called;
    //sessions.agent = req.get('User-Agent');
    sessions.sessions   = (body.session)?body.session:body.match.uuid;

    let { data, error } = await conn.from('log').insert(sessions);

    if(error){

      console.log(error);
      
    }
        
}
 
module.exports = function () {

  return log;

};
