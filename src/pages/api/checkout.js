import mysql from "../../utils/mysql";
import { withIronSession } from "next-iron-session";
import { parseCookies, setCookie } from "nookies";
import { v4 as uuidv4 } from "uuid";
import sgMail from '@sendgrid/mail'

export default withIronSession(
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const uuid = uuidv4();
    const parsedCookies = parseCookies({ req });
    let basketId;
    if (parsedCookies.bid) {
      const [rows] = await mysql.query(
        "SELECT * FROM `basket` WHERE `uuid` =?",
        [parsedCookies.bid]
      );

      basketId = rows.length > 0 ? rows[0].id : undefined;
     
    }
    console.log(req.session.get("user"), "user");
    res.statusCode = 200;
    const body = req.body;
    
    let userId = req.session.get("user").id;

    const [
      data,
    ] = await mysql.query(
      "INSERT INTO `address` (address, city, `country`, postcode, userId) Values (?, ?, ?, ?, ?) ",
      [
        body.address.address,
        body.address.city,
        body.address.country,
        body.address.postcode,
        userId || null,
      ]
    );

    let addressId = data.insertId;

    const [
      row,
    ] = await mysql.query(
      "INSERT INTO `order` (userId, payment_method, addressId, basketId) Values (?, ?, ?, ?) ",
      [userId, body.paymentMethod.id, addressId, basketId]
    );
    let orderId = row.insertId;
    

    setCookie({ res }, "bid", "", {
      maxAge: -1,
      path: "/",
    });
    sgMail.setApiKey(process.env.SENDGRID_URL);
    const msg = {
      // change to user email retrieved from users table
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
    res.end(JSON.stringify({ orderId: orderId }));
  },
  {
    cookieName: "session",
    password: "complex_password_at_least_32_characters_long",
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
