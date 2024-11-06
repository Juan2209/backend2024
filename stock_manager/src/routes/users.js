const {Router} = require('express');
const {getAllUsers, create, update, remove, getUserById} = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);


module.exports = router;