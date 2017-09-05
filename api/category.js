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
    const data = db.get('categories').value();
    res.status(200).json({
      status: 1,
      message: lang.OK,
      data: data
    });
  })
  .post((req, res, next) => {
    const name = req.body.name;
    const id = randNumLib.idBuild();
    db.get('categories').push({
      id: id,
      name: name,
      unit: '个'
    }).write();
    res.status(200).json({
      status: 1,
      message: lang.OK,
    });
  });

module.exports = router;
