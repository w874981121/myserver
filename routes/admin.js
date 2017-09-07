/*
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import express from 'express'

import admin from '../controller/admin'

const router = express.Router();

/* GET */
router.get('/user', admin.user);

router.get('/role', admin.role);

// router.get('/jurisdictionr', admin.jurisdictionr);

export default router;
