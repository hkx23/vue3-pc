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
  // 可以在这里继续添加更多的通用方法。
};
