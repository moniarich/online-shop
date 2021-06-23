import sgMail from '@sendgrid/mail'


export default async function handler(req, res) {
    sgMail.setApiKey(process.env.SENDGRID_URL);
    const msg = {
      to: 'm.borowiak91@gmail.com',
      from: 'test@tomasztarnowski.com', // Use the email address or domain you verified above
      subject: 'HempOil online shop',
      text: 'Your order has been dispatched',
      html: '<strong>Your order has been dispatched</strong>',
    };
    (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();



    res.statusCode = 202;
    res.end(
      JSON.stringify({ message: "success"})
    );
}