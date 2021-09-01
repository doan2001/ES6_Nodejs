import express from 'express';
const router = express.Router();

import { userById, read, update, list, detailUser, id, remove } from './../controllers/user.controller';
import { requireSignin, isAdmin, isAuth } from './../controllers/auth.controller';

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/users/:userId', requireSignin, isAuth, isAdmin, list); // list user có check quyền quản trị

router.get('/users', list); // list user không cần quyền

router.get('/user/:userId', detailUser);

router.put('/user/:id/:userId', requireSignin, isAuth, isAdmin, update);

router.delete('/user/:id/:userId', requireSignin, isAuth, isAdmin, remove);

router.param('userId', userById);

router.param('id', id);

module.exports = router;