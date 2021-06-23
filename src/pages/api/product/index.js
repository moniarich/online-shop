import mysql from "../../../utils/mysql";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await addNew(req, res);
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ message: "Invalid HTTP method" }));
  return;

  async function addNew(req, res) {
    const body = req.body;

    await mysql.query("SELECT * FROM `products`");

    const [p] = await mysql.query(
      "INSERT INTO `products` (inventory, title, img, description, price) Values (?, ?, ?, ?, ?) ",

      [body.inventory, body.title, body.img, body.description, body.price]
    );
    //const p = newProduct.insertId
   

    res.setHeader("Content-Type", "application/json");

    // change product object to string and sent it to the browser
    res.statusCode = 202;
    res.end(JSON.stringify({ message: "success", id: p.insertId }));
  }
}
