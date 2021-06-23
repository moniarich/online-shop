import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
  const user = req.session.get("user");

  if (!user) {
    res.statusCode = 401;
    res.send({});
    return;
  }

  res.send({ ...user });
}

export default withIronSession(handler, {
  cookieName: "session",
  password: "complex_password_at_least_32_characters_long",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
