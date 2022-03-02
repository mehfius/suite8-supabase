module.exports = function(app){

  const passRecovery = async function (email){

    const conn     = app.config.supa();

    const { data, error }  = await conn.from("passrecovery").insert({email:email});

  };

const html = `

<div>

  <a href='https://doctor8.com.br/' target='_blank'>
  <img width="100%" style='display:block;' src='https://doctor8.com.br/email/firstaccess/img/1.png'>
  </a>

  <img width="100%" style='display:block;' src='https://doctor8.com.br/email/firstaccess/img/2.png'>

  <a href='https://api.whatsapp.com/send?phone=5531971720053' target='_blank'>
  <img width="100%" style='display:block;'  src='https://doctor8.com.br/email/firstaccess/img/3.png'>
  </a>

  <a href='https://linktr.ee/doctor_8' target='_blank'>
  <img width="100%" style='display:block;' src='https://doctor8.com.br/email/firstaccess/img/4.png'>
  </a>

</div>

`;

  app.get('/emailfirstaccess', function(req,res){

    const email    = 'matheus.ferraz@gmail.com';
    const status   = {};


    const main     = async function (){



      res.send(status);





          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey(process.env['SENDGRID_API_KEY'])
          const msg = {
            to: email, // Change to your recipient
            from: {email: process.env['emailuser'],name: 'Doctor8'}, // Change to your verified sender
            subject: 'Email de primeiro acesso',
            text: 'Não disponível',
            html: html,
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

    main();

  });
  
}