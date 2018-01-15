'use strict';

const express = require('express');
const api = express.Router();
const auth = require('./../middlewares/auth');
const productController = require('./../controllers/product');
const userController = require('./../controllers/user');

api.get('/product', auth.isAuth, productController.getProducts);

api.get('/product/:productId', auth.isAuth, productController.getProduct);

api.post('/product', auth.isAuth, productController.saveProduct);

api.put('/product/:productId', auth.isAuth, productController.updateProduct);

api.delete('/product/:productId', auth.isAuth, productController.deleteProduct);

api.post('/signup', userController.signUp);

api.post('/signin', userController.signIn);

module.exports = api;
