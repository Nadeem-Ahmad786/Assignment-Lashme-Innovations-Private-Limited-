const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.create);
router.get('/:username', userController.readSingle)
router.get('/:username/followers', userController.readUserFollower)
router.get('/:username/following', userController.readUserFollowing)
router.post('/:username/follow', userController.userFollow)
router.delete('/:username/follow', userController.userUnfollow)


module.exports = router;