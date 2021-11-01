app.post('/log', (req, res) => {
console.log(req.body);
res.send("data");
    const main = async () => {
    console.log('debug');
  let { insertdata, inserterror } = await connSupa().from('logerror').upsert(req.body)

  if (inserterror) {
    console.error(inserterror);
    return;
  } 
  };

  main();
// res.send("data"); 
  
});