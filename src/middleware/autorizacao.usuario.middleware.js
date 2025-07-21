class AutorizacaoMiddleware {
  static autorizar(papeisPermitidos) {
    return (requisicao, resposta, proximo) => {
      const usuario = requisicao.usuario;

      // 🔍 LOG PARA DEPURAÇÃO
      console.log("🔍 Tipo recebido no middleware:", usuario?.tipo);
      console.log("🔍 Papeis permitidos:", papeisPermitidos);
      console.log("🔍 Usuário completo:", usuario);

      if (!usuario || !papeisPermitidos.includes(usuario.tipo)) {
        return resposta
          .status(403)
          .json({ msg: "Acesso não autorizado para este recurso!" });
      }

      proximo();
    };
  }
}

module.exports = AutorizacaoMiddleware;
