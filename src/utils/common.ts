// 通用方法
import _ from 'lodash';

export default {
  // 初始化对象
  reset(formData) {
    Object.keys(formData).forEach((key) => {
      if (_.isArray(formData[key])) {
        formData[key] = [];
      } else if (_.isNumber(formData[key])) {
        formData[key] = 0;
      } else if (_.isBoolean(formData[key])) {
        formData[key] = true;
      } else {
        formData[key] = '';
      }
    });
  },
  // 前端生成guid
  generateBigIntId() {
    const minBigInt = 0n; // 最小可能的 BIGINT 值
    const maxBigInt = 9223372036854775807n; // 最大可能的 BIGINT 值

    // 使用 Math.random() 生成一个介于 [0, 1) 的浮点数
    // 然后将其映射到 [minBigInt, maxBigInt] 范围内
    const randomFloat = Math.random();
    const randomBigInt = minBigInt + BigInt(Math.floor(randomFloat * Number(maxBigInt - minBigInt)));

    // 将浮点数转换为整数并确保其落在指定范围内
    return randomBigInt;
  },

  // 可以在这里继续添加更多的通用方法。
};
