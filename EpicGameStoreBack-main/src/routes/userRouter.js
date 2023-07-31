const { Router } = require('express');
const userRouter = Router();
const { jwtMiddleware } = require(`../handlers/activityJsonWebToken.js`);

const {postUsers , getUserByIdHandler, getUserLoginHandler, patchUser, getUserByEmail, getUserEmailRegister, createAdmin, getDetailUser, getVendorByIdHandler, getDetailVendor}  = require('../handlers/activityUsers')


userRouter.get(`/emailLogin/:email`, getUserByEmail)
userRouter.get(`/emailRegister/:email`, getUserEmailRegister)
userRouter.post(`/login`, getUserLoginHandler);
userRouter.post('/', postUsers);
userRouter.post(`/createAdmin`, createAdmin);
userRouter.get('/vendor/:id', getVendorByIdHandler);
userRouter.get('/vendorDetail/:id', jwtMiddleware, getDetailVendor);
userRouter.get('/user/:id', getUserByIdHandler);
userRouter.get("/userDetail/:id", jwtMiddleware, getDetailUser);
userRouter.patch(`/:id`, jwtMiddleware, patchUser);

module.exports = userRouter;