const userRouter = require('express').Router();
const { validationUpdateInfo } = require('../middlewares/validation');
const {getUserInfo, updateUserInfo} = require("../controllers/users");

userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', validationUpdateInfo, updateUserInfo);

module.exports = userRouter;