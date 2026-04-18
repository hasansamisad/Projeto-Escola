"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// Não deveriam existir em um sistema real por possiveis falhas de segurança em sua lógica,
//  como listar todos os usauaios
// router.get('/', loginRequired, userController.index);
// router.get('/:id', userController.show);

router.post('/', _loginRequired2.default, _UserController2.default.store);
router.put('/', _loginRequired2.default, _UserController2.default.update);
router.delete('/', _loginRequired2.default, _UserController2.default.delete);

exports. default = router;

/*
 O padrão do mercado é que pode ter em cada Controller até 5 métodos
 NOMES PADRÔES:
 index -> Lista todos os usuarios -> GET
 store/create -> cria um novo usuario -> POST
 delete -> apaga um usuario -> DELETE
 show -> mostra um usuario -> GET
 update -> atualiza um usuario -> PATCH ou PUT
 */
