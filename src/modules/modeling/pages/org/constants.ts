import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { OrgTreeVO } from '@/api/modeling';

export interface FormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: OrgTreeVO) => void;
}
