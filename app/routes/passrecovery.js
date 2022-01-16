module.exports = function(app){

  const passRecovery = async function (email){

    const conn     = app.config.supa();

    const { data, error }  = await conn.from("passrecovery").insert({email:email});

  };

  app.post('/passrecovery', function(req,res){

    const email    = req.body.email;
    const status   = {};
    const conn     = app.config.supa();

    const main     = async function (){

      let { data, error } = await conn.from('users').select('password').eq('email',email);

      status.status=data.length

      res.send(status);


      if(status.status){

        passRecovery(email);

        var nodemailer = require("nodemailer");
        
        var remetente = nodemailer.createTransport({

          host: "smtp.umbler.com",
          service: "smtp.umbler.com",
          port: 587,
          secure: false,
          auth:{user: "sistema@suite8.com.br",pass: "i}K7/*kOFgI6"}
          
        });

        var emailASerEnviado = {

        from: "sistema@suite8.com.br",
        to: email,
        subject: "Recuperação de senha",
        html: "Sua senha é: <b>"+data[0].password+"</b>",

        };

        remetente.sendMail(emailASerEnviado, function(error){});

      }

    }

    main();

  });
  
}