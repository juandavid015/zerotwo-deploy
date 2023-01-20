
var nodemailer = require('nodemailer');


var mailOptions = {
    from: '"Example Team" <from@example.com>',
    to: 'user1@example.com, user2@example.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer 😉 ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};

const sendEmail = async(email, subject, text) => {
    try {
    const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: "zerotwoproject2023@gmail.com",
                pass: "ymzrdtjgcmpxzivl"
            },
            from: 'zerotwoproject2023@gmail.com',
            tls: {
                rejectUnauthorized: true
            }
    })
    await transporter.sendMail({
        from: 'zerotwoproject2023@gmail.com',
        to: email,
        subject: `Zero Two`,
        text: `Email verification`,
        html: `
        <div style='width: fit-content; height: 100vh; color:#1a0750; 
                  text-align:center; '>
          <div style='background-color: white; padding:3em; width:100%; text-align: center;'>
            
            <div style='min-height: 6em; background:white; width:100%;'>
              <h1><strong>Welcome to Zero Two!</strong></h1>
            </div>
            <img src='https://freepngimg.com/thumb/anime/13-2-anime-png-image-thumb.png' style='max-height: 150px' />
            <h2 style="opacity: .8">Click in the button bellow to complete your account verification</h2>
            <a href=${text} style='padding: 1em; background-color: #1a0750; text-decoration:none; color: white;'
                onMouseOver="this.style.backgroundColor='#5519b6'; this.style.color='white'";
                onMouseOut="this.style.backgroundColor='#1a0750'; this.style.color='white'">
              <strong>                           
                Verify account
              </strong>
            </a>
          </div>
        </div>
        
        `
      });
      
    }catch (err) {
        throw new Error(err);
    }
}

module.exports = sendEmail;