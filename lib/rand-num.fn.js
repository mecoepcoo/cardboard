/**
 * 随机数生成工具函数
 * Created by Tianzhen on 2017/8/31.
 */
const randNumLib = {
  /**
   * 生成n位十六进制随机数
   * @param n 位数
   * @returns {string} 生成的随机数
   */
  getRandNum: (n) => {
    let randNum = '';
    for (let i = 0; i < n; i++) {
      randNum += Math.floor(Math.random() * 16).toString(16);
    }
    return randNum;
  },

  idBuild: () => {
    const rand = randNumLib.getRandNum(6);
    const date = (new Date().getTime()).toString(16);
    return date + rand;
  }
};

module.exports = randNumLib;