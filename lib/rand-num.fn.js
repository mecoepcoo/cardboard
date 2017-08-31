/**
 * 随机数生成工具函数
 * Created by Tianzhen on 2017/8/31.
 */
let randNum = '';

const randNumLib = {
  /**
   * 生成n位十六进制随机数
   * @param n 位数
   * @returns {string} 生成的随机数
   */
  getRandNum: (n) => {
    if (randNum.length < n) {
      randNum += Math.floor(Math.random() * 16).toString(16);
      return randNumLib.getRandNum(n);
    } else {
      return randNum;
    }
  }
};

module.exports = randNumLib;