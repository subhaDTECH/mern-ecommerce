const nodemailer=require("nodemailer")

const sendEmail=async(mailOptions)=>{

      console.log("mailloptions",mailOptions)
    // let testAccount = await nodemailer.createTestAccount();
    try{
        const transporter =await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            ignoreTLS: false,
             secure: true, // true for 465, false for other ports
            auth: {
              user:process.env.SMTP_EMAIL, // generated ethereal user
              pass:process.env.SMTP_PASS , // generated ethereal password
            },
          });
    
          //
    
          await transporter.sendMail({
            from:process.env.SMTP_EMAIL, // sender address
            to: 'subhaduleygba@gmail.com' , // list of receivers
            subject: mailOptions.subject, // Subject line
            text: mailOptions.message, // plain text body
            html: `<b>Hello world?</b> ${mailOptions.message}`, // html body
          });

    }catch(e){
          console.log(e);
    }


  

}


module.exports=sendEmail;