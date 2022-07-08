import Router from 'express';
import AddressController from '../controllers/AddressController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { AUTHORIZED } from '../utils/consts';

const router = Router();

router.get('/', checkRoleMiddleware(AUTHORIZED), AddressController.get);
router.post('/', checkRoleMiddleware(AUTHORIZED), AddressController.create);
router.put('/:id', checkRoleMiddleware(AUTHORIZED), AddressController.edit);
router.delete('/:id', checkRoleMiddleware(AUTHORIZED), AddressController.delete);

export default router;
