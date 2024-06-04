import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { Role } from '@/api/main';

export interface FormGroupRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: Role) => void;
}

export interface TreeNode {
  id: string | number;
  label: string;
  nodeCode: string;
  nodeName: string;
  parentNodeId: string | number;
  type: 'param' | 'group' | 'root';
  value: string;
  children?: TreeNode[];
}
