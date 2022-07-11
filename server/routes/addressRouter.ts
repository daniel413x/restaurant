import Router from 'express';
import AddressController from '../controllers/AddressController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { REGISTERED } from '../utils/consts';

const router = Router();

router.get('/', checkRoleMiddleware(REGISTERED), AddressController.get);
router.post('/', checkRoleMiddleware(REGISTERED), AddressController.create);
router.put('/:id', checkRoleMiddleware(REGISTERED), AddressController.edit);
router.put('/setdefault/:id', checkRoleMiddleware(REGISTERED), AddressController.setDefault);
router.delete('/:id', checkRoleMiddleware(REGISTERED), AddressController.delete);

export default router;
