const jwt = require("jsonwebtoken");

class AutenticacaoMiddleware {
  static autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // formato "Bearer TOKEN"

    // 🔎 LOG para depuração
    if (!token) {
      console.log("⛔ BLOQUEADO PELO MIDDLEWARE:", req.method, req.originalUrl);
      return res.status(401).json({ msg: "Token1 de acesso não fornecido!" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, usuario) => {
      if (err) {
        return res
          .status(403)
          .json({ msg: "Token2 de acesso inválido ou expirado!" });
      }

      req.usuario = usuario;
      next();
    });
  }
}

module.exports = AutenticacaoMiddleware;
