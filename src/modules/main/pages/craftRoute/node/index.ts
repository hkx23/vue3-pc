import LogicFlow from '@logicflow/core';

import end from './end';
import process from './process';
import sequence from './sequence';
import start from './start';

// 注册自定义图形
export const registerCustomElement = (lf: LogicFlow) => {
  lf.register(end);
  lf.register(process);
  lf.register(sequence);
  lf.register(start);
};
