const Usuario = require("./modules/usuario/models/usuario.model");
const Assinatura = require("./modules/assinatura/models/assinatura.model");

Usuario.hasMany(Assinatura, {
  foreignKey: 'codigo_usuario',
  as: 'assinaturas'
});

Assinatura.belongsTo(Usuario, {
  foreignKey: 'codigo_usuario',
  as: 'usuario'
});
