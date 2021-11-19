module.exports = function(app){

  app.post('/modules', function(req,res){

    const session  = req.body.session;
    const modules  = req.body.modules;

    const connection = app.config.supa();

    const main = async function (){

      const getUserAreas = async function(session){

        //let { data, error } = await connection.from("view_"+modules).select('medicoslabel,pacienteslabel,uuid,usersid,userslabel,a,d,id,created_at,update,label,categorylabel,category,me,share').eq('uuid',session).range(0,30)
  

        let { data, error } = await connection.from("view_"+modules).select('*').eq('uuid',session).range(0,30)

        return data;
          
      }

      const userAreas = await getUserAreas(session);

      res.send(userAreas); 

  }

  main();

  });
  
}