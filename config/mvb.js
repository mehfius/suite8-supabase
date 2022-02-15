const now = new Date(new Date()-3600*1000*3).toISOString();

const saveProntuarios = async function(modules,json){

  const { createClient } = require("@supabase/supabase-js");

  var connSupa = function () {

    return createClient(process.env['url'],process.env['anom_key'])

  };

  const conn      = connSupa();

  json.share = (json.share)?JSON.parse(json.share):null;

  json.update=now;

  let { data , error } = await conn.from(modules).upsert(json);

  if(error){
   
    console.log(error);
  }

}

const mvb = async function (json){

  let jsonProntuarios = {}

      jsonProntuarios.share       = '["10553"]';

      jsonProntuarios.pacientes   = json.users;
      jsonProntuarios.users       = json.users;
      
      jsonProntuarios.created_at  = now;
      jsonProntuarios.update      = now;

      jsonProntuarios.category    = 3000;

  let text ="";

  Object.entries(json.fieldlabel).forEach(([key, value]) => {

    text+=value+"\n";
    text+=json[key]+"\n";

  });



  jsonProntuarios.label       = text;

  saveProntuarios("prontuarios",jsonProntuarios);

}

module.exports = function () {

  return mvb;

};