import mysql from "../../utils/mysql";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await findUser(req, res);
  }
  res.statusCode = 405;
  res.end(JSON.stringify({ message: "Invalid HTTP method" }));
}

async function findUser(req, res) {
  const body = req.body;
  const [rows] = await mysql.query("SELECT * FROM `users` WHERE `email` = ?", [
    body.email,
  ]);

  if (rows.length === 0) {
    const salt = uuidv4();
    const password = crypto
      .createHash("sha256")
      .update(body.password + salt)
      .digest("hex");

    await mysql.query(
      "INSERT INTO `users` (userId, lastName, firstName, email, password, last_login, isActivate,salt) Values (?, ?, ?, ?, ?, ?, ?, ?) ",
      [
        body.userId,
        body.lastName,
        body.firstName,
        body.email,
        password,
        body.last_login,
        body.isActivate,
        salt,
      ]
    );

    res.statusCode = 200;
    res.end(JSON.stringify({ message: "success" }));

    return;
  }
  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser
  res.statusCode = 401;
  res.end(JSON.stringify({ message: "Sorry, your e-mail already exists" }));
  return;
}
