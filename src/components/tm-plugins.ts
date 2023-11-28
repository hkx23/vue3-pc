import TmExtend from './tm-extend/index.vue';
import TmQuery from './tm-query/index.vue';
import TmSelectBusiness from './tm-select-business/index.vue';
import TmSelectTable from './tm-select-table/index.vue';

export default {
  install: (app) => {
    app.component('TmSelectBusiness', TmSelectBusiness);
    app.component('TmSelectTable', TmSelectTable);
    app.component('TmQuery', TmQuery);
    app.component('TmExtend', TmExtend);
  },
};
