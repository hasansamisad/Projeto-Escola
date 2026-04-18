import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveriam existir em um sistema real por possiveis falhas de segurança em sua lógica,
//  como listar todos os usauaios
// router.get('/', loginRequired, userController.index);
// router.get('/:id', userController.show);

router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
 O padrão do mercado é que pode ter em cada Controller até 5 métodos
 NOMES PADRÔES:
 index -> Lista todos os usuarios -> GET
 store/create -> cria um novo usuario -> POST
 delete -> apaga um usuario -> DELETE
 show -> mostra um usuario -> GET
 update -> atualiza um usuario -> PATCH ou PUT
 */
