
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