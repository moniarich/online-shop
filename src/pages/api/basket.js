import mysql from "../../utils/mysql";
import { v4 as uuidv4 } from "uuid";
import { parseCookies, setCookie } from "nookies";

export default async function handler(req, res) {
  const parsedCookies = parseCookies({ req });

  

  let basketId;

  if (parsedCookies.bid) {
    const [rows] = await mysql.query("SELECT * FROM `basket` WHERE `uuid` =?", [
      parsedCookies.bid,
    ]);

    basketId = rows.length > 0 ? rows[0].id : undefined;
  }

  if (!basketId) {
    const uuid = uuidv4();

    const [data] = await mysql.query(
      "INSERT INTO `basket` (uuid) Values (?) ",
      [uuid]
    );
    basketId = data.insertId;
    setCookie({ res }, "bid", uuid, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    
  }

  if (req.method === "POST") {
    return await add(req, res, basketId);
  } else if (req.method === "PUT") {
    return update(req, res, basketId);
  } else if (req.method === "DELETE") {
    return remove(req, res, basketId);
  } else if (req.method === "GET") {
    return basketProduct(res, basketId);
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ message: "Invalid HTTP method" }));

  // i need send to browser stringifyed product or 'not found' string if product is undefined
}

function validateBodyProductId(body, res) {
  //check if productId exist
  if (body.productId === undefined) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Product id doesn't exist" }));
    return;
  }
}

async function findProduct(productId) {
  const [rows] = await mysql.query("SELECT * FROM `products` WHERE `id` = ?", [
    productId,
  ]);
  return rows[0];
}
function validateBodyQuantity(body, res) {
  if (body.quantity === undefined) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Product quantity doesn't exist" }));
    return;
  }
}
function validateProduct(product, res) {
  if (product === undefined) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not find" }));
    return;
  }
}
function validateBasketProduct(basketProduct, res) {
  if (basketProduct === undefined) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Product Not find" }));
    return;
  }
}

async function basketProduct(res, basketId) {
  const [rows] = await mysql.query("SELECT * FROM `basketProducts` WHERE `basketId`=?",[basketId]);
  //.get("basketProducts")
  // .value()

  const basketProducts = await Promise.all(
    rows.map(async (x) => {
      const [rows1] = await mysql.query(
        "SELECT * from products where `id`= ?",
        [x.productId]
      );

      const p = rows1[0];

      return {
        productId: x.productId,
        quantity: x.quantity,
        price: { value: p.price, currency: "£" },
        title: p.title,
      };
    })
  );

  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser
  res.statusCode = 202;

  res.end(JSON.stringify(basketProducts));
}

async function add(req, res, basketId) {
  const body = req.body;

  // read cookie

  validateBodyProductId(body, res);

  //check if quantity of product in the basket exist
  validateBodyQuantity(body, res);

  // fetch product based on basket product id if it exists this is to check if noone is cheating trying to add not existing product
  const product = await findProduct(body.productId);

  //check if product exist
  validateProduct(product, res);
  // checking if basketProduct is already in the basket

  const [
    basketProductRows,
  ] = await mysql.query(
    "SELECT * FROM `basketProducts` WHERE `productId`=? AND `basketId` = ?",
    [body.productId, basketId]
  );

  //if it isn't => push them
  if (basketProductRows.length === 0) {
    // check inventory
    if (product.inventory < body.quantity) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "quantity not available" }));
      return;
    }

    await mysql.query(
      "INSERT INTO `basketProducts` (productId, quantity, basketId) Values (?, ?, ?) ",
      [body.productId, body.quantity, basketId]
    );
    //   db.get("basketProducts")
    //     .push({
    //       productId: body.productId,
    //       quantity: body.quantity,
    //     })
    //     .write();
  } else {
    const basketProduct = basketProductRows[0];
    const sumOfQuantity = body.quantity + basketProduct.quantity;
  

    if (product.inventory < sumOfQuantity) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "quantity not available" }));
      return;
    }
    // update basket

    await mysql.query(
      "UPDATE `basketProducts` SET `quantity`= ? where `productId`= ? AND `basketId`= ?",
      [sumOfQuantity, body.productId, basketId]
    );
    // db.get("basketProducts")
    //   .find({ productId: body.productId })
    //   .assign({
    //     quantity: sumOfQuantity > 0 ? sumOfQuantity : 0,
    //   })
    //   .write();
  }
  
console.log(basketId)
  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser
  res.statusCode = 202;
  res.end(JSON.stringify({ message: "success" }));
}

async function update(req, res, basketId) {
  const body = req.body;

  //check if productId exist
  validateBodyProductId(body, res);

  //check if quantity of product in the basket exist
  validateBodyQuantity(body, res);

  // check if productId is compare to products id
  const product = await findProduct(body.productId);

  //check if product exist
  validateProduct(product, res);

  // check inventory
  if (product.inventory < body.quantity) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "quantity not available" }));
    return;
  }

  const [
    basketProductRows,
  ] = await mysql.query("SELECT * FROM `basketProducts` WHERE `productId`=? AND `basketId`= ?", [
    body.productId, basketId
  ]);
  const basketProduct = basketProductRows[0];
  const sumOfQuantity = body.quantity + basketProduct.quantity;

  // sql update body.quantity
  await mysql.query(
    "UPDATE `basketProducts` SET `quantity`= ? where `productId`= ? AND `basketId`= ?",
    [sumOfQuantity, body.quantity, basketId]
  );

  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser
  res.statusCode = 202;
  res.end(JSON.stringify({ message: "success" }));
}

// change product object to string and sent it to the browser

async function remove(req, res, basketId) {
  const body = req.body;

  //check if productId exist
  validateBodyProductId(body, res);

  // check if productId is compare to products id
  const product = await findProduct(body.productId);

  //check if product exist
  validateProduct(product, res);

  const [
    basketProducts,
  ] = await mysql.query(
    "SELECT * FROM `basketProducts` WHERE `productId` = ? AND `basketId`= ?",
    [body.productId, basketId]
  );

  validateBasketProduct(basketProducts[0], res, basketId);
  await mysql.query("DELETE FROM `basketProducts` WHERE `productId` = ? AND `basketId`= ?", [
    body.productId, basketId
  ]);
  // db.get("basketProducts").remove({ productId: body.productId }).write();

  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser
  res.statusCode = 202;
  res.end(JSON.stringify({ message: "success" }));
}
