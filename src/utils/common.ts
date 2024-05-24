// 通用方法
import _ from 'lodash';
import { LoadingPlugin } from 'tdesign-vue-next';

import { api as apiMain } from '@/api/main';

let loadingStart; // 用于存储loadingPluginFullScreen时候,调用时间戳的变量

export default {
  // 初始化对象
  reset(formData) {
    Object.keys(formData).forEach((key) => {
      if (_.isArray(formData[key])) {
        // formData[key] = []; // 直接赋值空，再嵌套深层页面有，可能会改变集合引用
        formData[key].splice(0, formData[key].length);
      } else if (_.isNumber(formData[key])) {
        formData[key] = 0;
      } else if (_.isBoolean(formData[key])) {
        formData[key] = false;
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
  // 获取minio的配置信息
  getFileServerHost() {
    return new Promise((resolve, reject) => {
      const data = apiMain.file.getFileServerHost();
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  // 根据path获取附件URL
  getSignedUrl(pathFileName: string) {
    return new Promise((resolve, reject) => {
      const data = apiMain.file.getSignedUrlByFullName({ pathFileName });
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  // 显示LOADING页面,默认至少显示0.5秒
  loadingPluginFullScreen(isLoading, loadingWaiting = 50) {
    const instance = LoadingPlugin({
      fullscreen: true,
      attach: 'body', // 挂载元素，默认挂载到组件本身所在的位置
      preventScrollThrough: false, // 防止滚动穿透，全屏加载模式有效
      loading: isLoading,
    });

    if (isLoading) {
      loadingStart = Date.now(); // 存储开始加载的时间戳
    } else {
      const elapsed = Date.now() - loadingStart; // 计算已经过的时间
      // console.log(`间隔时间：${elapsed}`);
      if (elapsed < loadingWaiting && elapsed > 0 && loadingWaiting - elapsed > 0) {
        const timer = setTimeout(() => {
          if (instance) {
            instance.hide();
          }
          clearTimeout(timer);
        }, loadingWaiting - elapsed);
      } else if (instance) {
        instance.hide();
      }
    }
  },

  // 可以在这里继续添加更多的通用方法。
};
