/**
 * 用户接口
 * Created by Tianzhen on 2017/8/23.
 */
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const lang = require('../config/lang.json');

router.route('/login')
/**
 * 登录操作
 */
  .get((req, res, next) => {
    let autoDate = db.get('user').value().auto;
    if (new Date().getTime() < autoDate) {
      return res.status(200).json({
        status: 1,
        message: lang.OK,
      });
    }
    let username = req.query.username;
    let password = req.query.password;
    let auto = +req.query.auto;

    let data = db.get('user').value();
    if (username === data.username && password === data.password) {
      if (auto) {
        let dateNow = new Date();
        let day = dateNow.getDate();
        let date = dateNow.setDate(day + 30);
        db.get('user').assign({
            auto: date
        }).write();
      }
      res.status(200).json({
        status: 1,
        message: lang.OK,
      });
    } else {
      res.status(200).json({
        status: 0,
        message: `${lang.ERROR}, 用户名或密码错误`,
      });
    }
  })
  /**
   * 修改用户名密码
   */
  .post((req, res, next) => {
    // 离线应用，明文存储即可
    let username = req.body.username;
    let password = req.body.password;
    db.get('user').assign({
      username: username,
      password: password
    }).write();
    res.status(200).json({
      status: 1,
      message: lang.OK
    });
  })
  /**
   * 重置密码
   */
  .put((req, res, next) => {
    let key = req.body.key;
    if(key === lang.PWD_RESET_KEY) {
      db.get('user').assign({
        username: 'admin',
        password: 'admin'
      }).write();
      res.status(200).json({
        status: 1,
        message: lang.OK
      });
    } else {
      res.status(200).json({
        status: 0,
        message: `${lang.ERROR}, 安全口令错误`
      });
    }
  })
  .delete((req, res, next) => {
    db.get('user').assign({
      auto: 0
    }).write();
    res.status(200).json({
      status: 1,
      message: lang.OK,
    });
  });

module.exports = router;