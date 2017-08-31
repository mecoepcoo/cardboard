/**
 * 分类相关接口
 * Created by Tianzhen on 2017/8/31.
 */
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const lang = require('../config/lang.json');
const randNumLib = require('../lib/rand-num.fn');

router.route('/category')
  .get((req, res, next) => {
    next();
  })
  .post((req, res, next) => {
    const name = req.body.name;
    const rand = randNumLib.getRandNum(6);
    const date = (new Date().getTime()).toString(16);
    const id = date + rand;
    db.get('categories').push({
      id: id,
      name: name
    }).write();
    res.status(200).json({
      status: 1,
      message: lang.OK,
    });
  });

module.exports = router;
