const { createClient } = require("@supabase/supabase-js");
const cors = require('cors');

const express = require('express');

var connSupa = function () {
  const url = "https://bhxafhsowweifsrnyfaa.supabase.co";
  const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzY0NzMxMCwiZXhwIjoxOTQ5MjIzMzEwfQ.vblH3ycs3KqRAOL2TT-XSQ4UWQ0uWAIzEE-_8cB4_6U";

  console.log("Conecta no supa");

  return createClient(url, key);
};

const app = express();

      app.use(cors());
      app.use(express.urlencoded({extended: true}))
      app.use(express.json())

app.get('/', (req, res) => {

  const main = async () => {
    let { data, error } = await connSupa()
      .from("suites")
      .select("id,label,url,files,color1")
      .order("data", { ascending: false })
      .range(0, 100);

    if (error) {
      console.error(error);
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    //res.setHeader('Access-Control-Allow-Credentials', true); 
    res.send(data)

  };

  main();
});


      app.listen(3000, () => {
        console.log('server started');
      });

