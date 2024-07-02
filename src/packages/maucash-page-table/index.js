import MaucashPageTable from './maucash-page-table'

MaucashPageTable.install = Vue => Vue.component(MaucashPageTable.name, MaucashPageTable);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MaucashPageTable);
}

export default MaucashPageTable;