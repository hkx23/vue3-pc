import { differenceInCalendarDays, endOfMonth, startOfMonth } from 'date-fns';
import { MessagePlugin } from 'tdesign-vue-next';

import { range1 } from './index.vue';

// 判断选中日期不超过31天
export const handleDateChange = (newRange) => {
  console.log('🚀 ~ handleDateChange ~ newRange:', newRange);
  // 将数组取出时间字符串
  // qTimeCreate.value =
  // qTimeModified.value =
  if (newRange && newRange.length === 2) {
    const [start, end] = newRange;
    const daysDiff = differenceInCalendarDays(end, start);
    if (daysDiff > 31) {
      MessagePlugin.error('选择的日期范围不能超过31天！');
      // 重置为默认范围或之前的有效范围
      // 例如，重置为当前月份的范围
      const now = new Date();
      range1.value = [startOfMonth(now), endOfMonth(now)];
    }
  }
};
