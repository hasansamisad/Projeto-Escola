"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });

    /*
     Verificando se o ID e/ou email do usuario foram alterados,
      não permitindo que passe em rotas que possuem loginRequired com um email
      diferente do inicial que foi recebido o token;
    */

    if (!user) {
      return res.status(401).json({
        error: ['Usuário inválido'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
