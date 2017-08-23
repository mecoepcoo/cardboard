const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/data.json');
const db = low(adapter);
db.defaults({
  // 用户
  user: {},
  // 分类
  categories: [],
  // 项目
  items: [],
  // 订单
  orders: []
})
  .write();

module.exports = db;