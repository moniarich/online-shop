import mysql from "../../utils/mysql";

export default async function handler(req, res) {
  // get value from url and convert to int and assing it to id var
  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser

  res.statusCode = 200;

  const q = req.query.q;
  const page = req.query.page || 1;
  const offSet = 9;
  const limit = (page - 1) * offSet;
  
  
  if (!q) {
    const [
      rows,
      fields,
    ] = await mysql.query("SELECT * FROM `products` LIMIT ?,?", [
      limit,
      offSet,
    ]);

    const [data] = await mysql.query("SELECT count (*) FROM `products`");
    
    res.end(JSON.stringify({products:rows, count: data[0]['count (*)']}));
    return;
  } else {
    const [
      rows,
      fields,
    ] = await mysql.query(
      "SELECT * FROM `products` WHERE MATCH (`title`, `description`) AGAINST( ? IN NATURAL LANGUAGE MODE) LIMIT ?,?",
      [q, limit, offSet]
    );

    const[data] = await mysql.query("SELECT count (*) FROM `products` WHERE MATCH (`title`, `description`) AGAINST( ? IN NATURAL LANGUAGE MODE)",[q])
    res.end(JSON.stringify({products:rows, count: data[0]['count (*)']}));
    return;
  }

  // const qr = q.split(" ");
  // const searchProducts = rows.filter((product) => {
  //   if (
  //     product.title.split(" ").find((w) => {
  //       return qr.find((z) => {
  //         return z === w;
  //       });
  //     })
  //   ) {
  //     return true;
  //   } else if (
  //     product.description.split(" ").find((w) => {
  //       return qr.find((z) => z === w);
  //     })
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  //res.end(JSON.stringify(searchProducts));
}
