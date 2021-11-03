const { createClient } = require("@supabase/supabase-js");

var connSupa = function () {
  const url = "https://bhxafhsowweifsrnyfaa.supabase.co";
  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzY0NzMxMCwiZXhwIjoxOTQ5MjIzMzEwfQ.vblH3ycs3KqRAOL2TT-XSQ4UWQ0uWAIzEE-_8cB4_6U";

  console.log("Conecta no supa");

  return createClient(url, key);
};
 
module.exports = function () {
  console.log("O autoload carregou o módulo de conexão com bd");

  return connSupa;
};
