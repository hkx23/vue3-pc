import { Ref, ref } from 'vue';

// 表格内容处理
export function useTable(): TableHookResult {
  const selectedRowKeys = ref<number[]>([]);
  const expandedRowKeys = ref<number[]>([]);
  function onSelectKeysChange(val: number[]): void {
    selectedRowKeys.value = val;
  }
  function onExpandKeysChange(val: number[]): void {
    expandedRowKeys.value = val;
  }
  return {
    selectedRowKeys,
    expandedRowKeys,
    onSelectKeysChange,
    onExpandKeysChange,
  };
}

type TableHookResult = {
  selectedRowKeys: Ref<number[]>;
  expandedRowKeys: Ref<number[]>;
  onSelectKeysChange: (val: number[]) => void;
  onExpandKeysChange: (val: number[]) => void;
};
