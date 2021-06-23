import mysql from "../../../utils/mysql";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await newOrder(req, res);
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ message: "Invalid HTTP method" }));
  return;
}

async function newOrder(req, res) {
  const body = req.body;
  const id = req.query.id;

  const [order] = await mysql.query("SELECT * FROM `order` WHERE `id`=?", [id]);

  console.log(body, "order body");
  
  let orderId = order[0].id;
  let addressId1 = order[0].addressId;
  let userId1 = order[0].userId;
  let basketId1 = order[0].basketId;
  // let products = basketProducts.map((item)=>{

  // }

  const [address] = await mysql.query("SELECT * FROM `address` WHERE `id`=?", [
    addressId1,
  ]);

  console.log(address, "address");

  const [user] = await mysql.query("SELECT * FROM `users` WHERE `userId`=?", [
    userId1,
  ]);
  console.log(user, "user");

  const [
    basket,
  ] = await mysql.query("SELECT * FROM `basketProducts` WHERE `basketId`=?", [
    basketId1,
  ]);
  console.log(basket, "bp");
  const products = await Promise.all(
    basket.map(async (x) => {
      console.log(x, "x");
      const [rows1] = await mysql.query(
        "SELECT * FROM `products` WHERE `id`=?",
        [x.productId]
      );
      const p = rows1[0];
      console.log(p, "p");
      return {
        productId: x.productId,
        quantity: x.quantity,
        price: { value: p.price, currency: "£" },
        title: p.title,
      };
    })
  );
  console.log(products, "pr");
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  res.end(JSON.stringify({ address: address[0], users: user[0], order: order[0], basketId: basket[0], products: products }));
}
