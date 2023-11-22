import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { OrgLevel } from '@/api/modeling';

export interface FormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (data?: OrgLevel) => void;
}
