var app = require("./config/server");

app.listen(3000, function () {

/*     const conn     = app.config.supa();

    const main     = async function (){

      let { data, error } = await conn.from('users').select().textSearch('label', `'matheus frança'`).range(0,30); 

      let { data, error } = await conn.rpc('pacientes', { string: 'franca' });

      console.log(data);
      console.log(error);

    }

    main();
 */
  console.log("rodando");
});
