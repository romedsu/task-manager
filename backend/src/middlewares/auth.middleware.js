const jwt = require("jsonwebtoken");
// const SECRET_KEY = "mi_secreto";

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  console.log(tokenHeader);

  // const token = req.headers.authorization?.split(" ")[1];
  const token = tokenHeader.split(" ")[1];

  console.log(token);

  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    /*payload-> const token =jwt.sign({userId:user._id}SECRET_KEY, {expiresIn:'1h'});
    decoded(payload)=
    */

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};
