import { ref } from 'vue';

/**
 * @description 加载
 * @params {initValue Boolean} 初始化状态
 * @returns {loading Boolean} 当前加载状态
 * @returns {setLoading Function} 设置loading状态 {loading}
 */

export const useLoading = (initValue = false) => {
  const loading = ref(initValue);
  const setLoading = (val: boolean) => {
    loading.value = val;
  };
  return {
    loading,
    setLoading,
  };
};
