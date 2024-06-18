import { FormInstanceFunctions } from 'tdesign-vue-next';
import { Ref } from 'vue';

import { PrintTmplDTO, PrintTmplMapDTO } from '@/api/main';

export const TEMPLATE_TYPE = [
  { value: 'mrt', label: 'REPORT' },
  { value: 'hi', label: 'HiPrint' },
  { value: 'btw', label: 'BARTENDER' },
];

export interface DesignerArgs {
  fileName: string;
  fileContent: string;
}

export interface TemplateFormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: PrintTmplDTO) => void;
}

export interface TemplateMapFormRef {
  form: Ref<FormInstanceFunctions>;
  submit: () => Promise<void>;
  reset: (isEdit: boolean, data?: PrintTmplMapDTO) => void;
}
