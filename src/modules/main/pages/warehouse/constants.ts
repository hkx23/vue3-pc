import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { Role } from '@/api/main';

export interface FormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: Role) => void;
}
