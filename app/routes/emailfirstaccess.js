module.exports = function(app){

  const passRecovery = async function (email){

    const conn     = app.config.supa();

    const { data, error }  = await conn.from("passrecovery").insert({email:email});

  };

const html = `<div id="container" style="font-size:12pt;float:left;height:2000px;width:800px;background-image:url(https://doctor8.com.br/email/firstaccess/img/bg.png);">

  <a href='https://doctor8.com.br/' target='_blank'>
    <div style="max-width:0;max-height: 0;">
      <div style="font-family:Verdana !important;display:inline-block;width:400px;height:150px;margin-left:220px;margin-top:85px;line-height:1.4;">
      </div>
    </div>
  </a>

  <a href='https://doctor8.com.br/' target='_blank'>
    <div style="max-width:0;max-height: 0;">
      <div style="font-family:Verdana !important;display:inline-block;width:200px;height:90px;margin-left:60px;margin-top:630px;line-height:1.4;">
      </div>
    </div>
  </a>

  <a href='https://api.whatsapp.com/send?phone=5531971720053' target='_blank'>
    <div style="max-width:0;max-height: 0;">
      <div style="font-family:Verdana !important;display:inline-block;width:405px;height:95px;margin-left:60px;margin-top:1560px;line-height:1.4;">
      </div>
    </div>
  </a>


  <a href='https://api.whatsapp.com/send?phone=5531971720053' target='_blank'>
    <div style="max-width:0;max-height: 0;">
      <div style="font-family:Verdana !important;display:inline-block;width:50px;height:50px;margin-left:240px;margin-top:1800px;line-height:1.4;">
      </div>
    </div>
  </a>

  
  <a href='https://t.me/doctor8med' target='_blank'>
    <div style="max-width:0;max-height: 0;">
      <div style="font-family:Verdana !important;display:inline-block;width:50px;height:50px;margin-left:340px;margin-top:1800px;line-height:1.4;">
      </div>
    </div>
  </a>

  
  <a href='https://www.facebook.com/Doctor8.Oficial' target='_blank'>
    <div style="max-width:0;max-height: 0;">
      <div style="font-family:Verdana !important;display:inline-block;width:50px;height:50px;margin-left:426px;margin-top:1800px;line-height:1.4;">
      </div>
    </div>
  </a>

  
  <a href='https://www.gettr.com/user/doctor8' target='_blank'>
    <div style="max-width:0;max-height: 0;">
      <div style="font-family:Verdana !important;display:inline-block;width:50px;height:50px;margin-left:518px;margin-top:1800px;line-height:1.4;">
      </div>
    </div>
  </a>

  </div>`;

  app.get('/emailfirstaccess', function(req,res){

    //const email    = 'fernandohsilva@outlook.com.br';
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