/**
 * 项目相关接口
 * Created by Tianzhen on 2017/8/31.
 */
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const lang = require('../config/lang.json');
const randNumLib = require('../lib/rand-num.fn');

router.route('/items')
  .get((req, res, next) => {
    const cid = req.query.cid;
    console.log(cid);
    const data = db.get('items').filter({cid: cid}).value();
    res.status(200).json({
      status: 1,
      message: lang.OK,
      data: data
    });
  })
  .post((req, res, next) => {
    console.log(req.body);
    const id = randNumLib.idBuild();
/*    db.get('items').push({
      id: 5,
      name: 1
    }).write();*/
    res.status(200).json({
      status: 1,
      message: lang.OK,
    });
  });

module.exports = router;
