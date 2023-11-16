import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { OrgLevel } from '../../api/model/orgLevelModel';

export interface FormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (data?: OrgLevel) => void;
}
