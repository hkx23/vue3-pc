import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { Event } from '@/api/daily';

export interface FormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: Event) => void;
}
