import BcmpExtend from './bcmp-extend/index.vue';
import BcmpSelectBusiness from './bcmp-select-business/index.vue';
import BcmpSelectTable from './bcmp-select-table/index.vue';
import CmpQuery from './cmp-query/index.vue';
import CmpTable from './cmp-table/index.vue';

export default {
  install: (app) => {
    app.component('BcmpSelectBusiness', BcmpSelectBusiness);
    app.component('BcmpSelectTable', BcmpSelectTable);
    app.component('CmpQuery', CmpQuery);
    app.component('BcmpExtend', BcmpExtend);
    app.component('CmpTable', CmpTable);
  },
};
