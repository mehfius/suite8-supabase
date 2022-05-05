module.exports = function(app){

  app.post('/modules', function(req,res){
  
      const session  = req.body.session;
      const modules  = req.body.modules;
      const id       = req.body.id;
      const match    = req.body.match
      const page     = (req.body.page!=undefined)?req.body.page:0;
      const start    = page
      const final    = (req.body.page!=undefined)?req.body.page+30:30;
      
      const connection = app.config.supa();
  
      app.config.log(req.body,"modules.js");
  
      const main = async function (){
  
        const getUserAreas = async function(session){
          
          if(id){
  
              var { data, error } = await connection.from("view_"+modules).select('*').eq('uuid',session).eq('id',id);
              
          }else{
  
            if(match){
  
              var { data, error } = await connection.from("view_"+modules).select('*').match(match).range(start,final);
  
            }
          }
  
          return data;
            
        }
  
        const userAreas = await getUserAreas(session);
  
        res.send(userAreas); 
  
    }
    
  
    main();

  });
  
}