import mysql from "../../utils/mysql";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import { withIronSession } from "next-iron-session";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
  }
  const body = req.body;
  const [rows] = await mysql.query("SELECT * FROM `users` WHERE `email` = ?", [
    body.email,
  ]);

  if (rows.length === 0) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Sorry, You have to first sign up" }));
    return;
  }
  const saltpas = crypto
    .createHash("sha256")
    .update(body.password + rows[0].salt)
    .digest("hex");
  if (rows[0].password !== saltpas) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Sorry, You have to first sign up" }));
    return;
  }

  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser

  req.session.set("user", {
    id: rows[0].userId,
    firstName: rows[0].firstName,
    admin: false,
  });
  await req.session.save();
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "success" }));
}

export default withIronSession(handler, {
  cookieName: "session",
  password: "complex_password_at_least_32_characters_long",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
