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

          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey(process.env['SENDGRID_API_KEY'])
          const msg = {
            to: email, // Change to your recipient
            from: {email: process.env['emailuser'],name: 'Doctor8'}, // Change to your verified sender
            subject: 'Recuperação de senha',
            text: 'Sua senha é: '+data[0].password,
            html: 'Sua senha é: <b>'+data[0].password+'</b>',
          }
          sgMail
          .send(msg)
          .then(() => {
          console.log('Recuperação : '+email)
          })
          .catch((error) => {
          console.error(error.response.body)
          })

      }

    }

    main();

  });
  
}