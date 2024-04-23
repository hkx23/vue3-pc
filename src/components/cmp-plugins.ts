import BcmpExtend from './bcmp-extend/index.vue';
import BcmpImportAutoButton from './bcmp-import-auto-button/index.vue';
import BcmpImportAutoDialog from './bcmp-import-auto-dialog/index.vue';
import BcmpImportButton from './bcmp-import-button/index.vue';
import BcmpImportDialog from './bcmp-import-dialog/index.vue';
import BcmpSelectBusiness from './bcmp-select-business/index.vue';
import BcmpSelectList from './bcmp-select-list/index.vue';
import BcmpSelectList2 from './bcmp-select-list2/index.vue';
import BcmpSelectParam from './bcmp-select-param/index.vue';
import BcmpSelectTable from './bcmp-select-table/index.vue';
import BcmpUploadContent from './bcmp-upload-content/index.vue';
import BCmpCustomer from './cmp-business/BCmpCustomer.vue';
import BCmpMitem from './cmp-business/BCmpMitem.vue';
import BCmpMitemCategory from './cmp-business/BCmpMitemCategory.vue';
import BCmpMo from './cmp-business/BCmpMo.vue';
import BCmpMoSchedule from './cmp-business/BCmpMoSchedule.vue';
import BCmpPerson from './cmp-business/BCmpPerson.vue';
import BCmpRouting from './cmp-business/BCmpRouting.vue';
import BCmpSupplier from './cmp-business/BCmpSupplier.vue';
import BCmpUser from './cmp-business/BCmpUser.vue';
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
    app.component('BcmpSelectParam', BcmpSelectParam);
    app.component('BcmpSelectBusiness', BcmpSelectBusiness);
    app.component('BcmpSelectTable', BcmpSelectTable);
    app.component('BcmpSelectList', BcmpSelectList);
    app.component('BcmpSelectList2', BcmpSelectList2);

    app.component('BcmpImportButton', BcmpImportButton);
    app.component('BcmpImportDialog', BcmpImportDialog);
    app.component('BcmpImportAutoButton', BcmpImportAutoButton);
    app.component('BcmpImportAutoDialog', BcmpImportAutoDialog);
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

    // app.component('CmpPrintButton', CmpPrintButton);
    app.component('CmpWrapper', CmpWrapper);

    app.component('BCmpPerson', BCmpPerson);
    app.component('BCmpUser', BCmpUser);
    app.component('BCmpSupplier', BCmpSupplier);
    app.component('BCmpCustomer', BCmpCustomer);
    app.component('BCmpMitem', BCmpMitem);
    app.component('BCmpMitemCategory', BCmpMitemCategory);
    app.component('BCmpRouting', BCmpRouting);
    app.component('BCmpMo', BCmpMo);
    app.component('BCmpMoSchedule', BCmpMoSchedule);
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

    BCmpPerson: typeof BCmpPerson;
    BCmpUser: typeof BCmpUser;
    BCmpSupplier: typeof BCmpSupplier;
    BCmpCustomer: typeof BCmpCustomer;
    BCmpMitem: typeof BCmpMitem;
    BCmpMitemCategory: typeof BCmpMitemCategory;
    BCmpRouting: typeof BCmpRouting;
    BCmpMo: typeof BCmpMo;
    BCmpMoSchedule: typeof BCmpMoSchedule;
  }
}
