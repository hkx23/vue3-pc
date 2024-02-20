import BcmpExtend from './bcmp-extend/index.vue';
import BcmpImportButton from './bcmp-import-button/index.vue';
import BcmpImportDialog from './bcmp-import-dialog/index.vue';
import BcmpSelectBusiness from './bcmp-select-business/index.vue';
import BcmpSelectList from './bcmp-select-list/index.vue';
import BcmpSelectTable from './bcmp-select-table/index.vue';
import BcmpUploadContent from './bcmp-upload-content/index.vue';
import CmpButton from './cmp-button/index.vue';
import CmpWrapper from './cmp-kanban/CmpWrapper.vue';
import CmpCard from './cmp-layout/CmpCard.vue';
import CmpContainer from './cmp-layout/CmpContainer.vue';
import CmpRow from './cmp-layout/CmpRow.vue';
import CmpMessage from './cmp-message/index.vue';
import CmpPrintButton from './cmp-print-button/index.vue';
import CmpQuery from './cmp-query/index.vue';
import CmpScanInput from './cmp-scan-input/index.vue';
import CmpTable from './cmp-table/index.vue';

export default {
  install: (app) => {
    app.component('BcmpSelectBusiness', BcmpSelectBusiness);
    app.component('BcmpSelectTable', BcmpSelectTable);
    app.component('BcmpSelectList', BcmpSelectList);
    app.component('BcmpImportButton', BcmpImportButton);
    app.component('BcmpImportDialog', BcmpImportDialog);
    app.component('BcmpUploadContent', BcmpUploadContent);

    app.component('CmpQuery', CmpQuery);
    app.component('BcmpExtend', BcmpExtend);
    app.component('CmpTable', CmpTable);
    app.component('CmpMessage', CmpMessage);

    // 布局
    app.component('CmpContainer', CmpContainer);
    app.component('CmpRow', CmpRow);
    app.component('CmpCard', CmpCard);
    app.component('CmpButton', CmpButton);
    app.component('CmpScanInput', CmpScanInput);

    app.component('CmpPrintButton', CmpPrintButton);
    app.component('CmpWrapper', CmpWrapper);
  },
};

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CmpContainer: typeof CmpContainer;
    CmpRow: typeof CmpRow;
    CmpCard: typeof CmpCard;
    CmpButton: typeof CmpButton;
    CmpPrintButton: typeof CmpPrintButton;
    CmpTable: typeof CmpTable;
    CmpWrapper: typeof CmpWrapper;
  }
}
