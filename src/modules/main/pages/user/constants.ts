import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { User } from '@/api/main';

export interface FormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: User) => void;
}
