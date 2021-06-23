import Busboy from "busboy";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const publicDir = "public";

export default async function handler(req, res) {
  let uploadedFileName;
  const busboy = new Busboy({ headers: req.headers });

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    const p = filename.split(".");
    const ext = p[p.length - 1];
    uploadedFileName = `${uuidv4()}.${ext}`;
    
    const f = fs.createWriteStream(`${publicDir}/${uploadedFileName}`);

    file.pipe(f);
  });

  busboy.on("finish", function () {
    res.statusCode = 202;
    res.end(
      JSON.stringify({ message: "success", path: "/" + uploadedFileName })
    );
  });

  req.pipe(busboy);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
