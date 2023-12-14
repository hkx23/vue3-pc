import BcmpExtend from './bcmp-extend/index.vue';
import BcmpSelectBusiness from './bcmp-select-business/index.vue';
import BcmpSelectList from './bcmp-select-list/index.vue';
import BcmpSelectTable from './bcmp-select-table/index.vue';
import CmpCard from './cmp-layout/CmpCard.vue';
import CmpContainer from './cmp-layout/CmpContainer.vue';
import CmpRow from './cmp-layout/CmpRow.vue';
import CmpQuery from './cmp-query/index.vue';
import CmpTable from './cmp-table/index.vue';

export default {
  install: (app) => {
    app.component('BcmpSelectBusiness', BcmpSelectBusiness);
    app.component('BcmpSelectTable', BcmpSelectTable);
    app.component('BcmpSelectList', BcmpSelectList);
    app.component('CmpQuery', CmpQuery);
    app.component('BcmpExtend', BcmpExtend);
    app.component('CmpTable', CmpTable);
    // 布局
    app.component('CmpContainer', CmpContainer);
    app.component('CmpRow', CmpRow);
    app.component('CmpCard', CmpCard);
  },
};

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CmpContainer: typeof CmpContainer;
    CmpRow: typeof CmpRow;
    CmpCard: typeof CmpCard;
  }
}
