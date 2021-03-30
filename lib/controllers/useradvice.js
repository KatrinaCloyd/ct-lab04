const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');


module.exports = Router()

    .post('/', async (req, res, next) => {
        try {
            const newUser = await UserService.create(req.body);
            res.send(newUser);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const users = await User.getAll();
            res.send(users);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const user = await User.getById(req.params.id)
            res.send(user);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const user = await UserService.update(req.params.id)
            res.send(user);
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const user = await UserService.delete(req.params.id)
            res.send(user);
        } catch (err) {
            next(err);
        }
    })
