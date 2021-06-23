import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
  req.session.destroy();
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Logged out" }));
}
 


export default withIronSession(handler, {
  cookieName: "session",
  password: "complex_password_at_least_32_characters_long",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
