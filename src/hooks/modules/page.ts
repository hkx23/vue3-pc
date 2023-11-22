import { ref } from 'vue';

/**
 * @description 加载
 * @params {initValue} 初始化状态
 * @returns {pageUI} 当前页码状态
 */

export const usePage = (initValue = { pageIndex: 1, pageSize: 10 }) => {
  const pageUI = ref(initValue);

  return {
    pageUI,
  };
};
