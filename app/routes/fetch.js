
module.exports = function(app){

  app.get('/fetch', function(req,res){

    res.send("go!");
console.log('go');
  });

};