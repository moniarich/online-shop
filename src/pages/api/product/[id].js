import mysql from "../../../utils/mysql";

export default async function handler(req, res) {
  // get value from url and convert to int and assing it to id var
  if (req.method === "PUT") {
    return update(req, res);
  } else if (req.method === "DELETE") {
    return remove(req, res);
  } else if (req.method === "GET") {
    const id = parseInt(req.query.id);

    console.log(id);
    // find product with the same id as variable id

    const [
      rows,
      fields,
    ] = await mysql.query("SELECT * FROM `products` WHERE `id` = ? ", [id]);

    

    // set http contenttype to JSON
    res.setHeader("Content-Type", "application/json");

    // change product object to string and sent it to the browser
    if (rows.length === 0) {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          message:
            "the product you are looking for does not exist, statusCode = 404",
        })
      );
    } else {
      const product = {
        ...rows[0],
        price: {
          currency: "£",
          value: rows[0].price,
        },
      };
      // set http status to ok
      res.statusCode = 200;
      res.end(JSON.stringify(rows[0]));
    }
  } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ message: "Invalid HTTP method" }));
  }
}

async function update(req, res) {
  const body = req.body;

  const [
    r,
  ] = await mysql.query(
    "UPDATE `products` SET `title`= ?, `description`= ?, `inventory`= ?, `img` = ?, `price`= ? where `id`= ?",
    [
      body.title,
      body.description,
      body.inventory,
      body.img,
      body.price,
      req.query.id,
    ]
  );

  console.log("update", body, r.affectedRows);
  if (r.affectedRows === 0) {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message:
          "the product you are looking for does not exist, statusCode = 404",
      })
    );
  }

  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");
  // change product object to string and sent it to the browser
  res.statusCode = 202;
  res.end(JSON.stringify({ message: "success" }));
}
async function remove(req, res) {
  const body = req.body;

  const [r] = await mysql.query("DELETE FROM `products` WHERE `id`= ? ", [
    req.query.id,
  ]);
  console.log("remove", r.affectedRows);
  if (r.affectedRows === 0) {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message:
          "the product you are looking for does not exist, statusCode = 404",
      })
    );
  }
  // set http contenttype to JSON
  res.setHeader("Content-Type", "application/json");

  // change product object to string and sent it to the browser
  res.statusCode = 202;
  res.end(JSON.stringify({ message: "success" }));
}

// i need send to browser stringifyed product or 'not found' string if product is undefined
