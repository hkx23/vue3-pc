import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { OrgTreeVO } from '@/api/main';

export interface FormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: OrgTreeVO, parentOrgName?: string, parentOrgLevels?: string[]) => void;
}
