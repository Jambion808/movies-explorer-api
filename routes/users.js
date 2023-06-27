const userRouter = require('express').Router();
const { getUserData, updateUserData } = require('../controllets/users');
const { updateProfileValidation } = require('../middlewares/validators');

userRouter.get('/me', getUserData);
userRouter.patch('/me', updateProfileValidation, updateUserData);

module.exports = userRouter;
