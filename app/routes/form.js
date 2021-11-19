module.exports = function(app){

  app.post('/form', function(req,res){

    const session  = req.body.session;
    const modules  = req.body.modules;
    const id       = req.body.id;

    const conn     = app.config.supa();

    const main     = async function (){
      /* 
      const go = async function(session){
      */

        //let { data, error } = await connection.from("view_"+modules).select('medicoslabel,pacienteslabel,uuid,usersid,userslabel,a,d,id,created_at,update,label,categorylabel,category,me,share').eq('uuid',session).range(0,30)

        let { data, error } = await conn.from("form_"+modules).select('*').eq('uuid',session).eq('id',id).range(0,30);

      /*       return data;
          
      }

      const userAreas = await go(session); */

      res.send(data); 

    }

    main();

  });
  
}