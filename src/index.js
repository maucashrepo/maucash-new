import MaucashLogin from './packages/maucash-login/index.js';
import MaucashDatePicker from './packages/maucash-date-picker/index.js';
import MaucashPageTable from './packages/maucash-page-table/index.js';
import MaucashValueCount from './packages/maucash-value-count/index.js';
import MaucashModal from './packages/maucash-modal/index.js';
import MaucashChangePassword from './packages/maucash-change-password/index.js';
import MaucashProduct from "./packages/maucash-product/index.js";
const components = [
  MaucashLogin,
  MaucashDatePicker,
  MaucashPageTable,
  MaucashValueCount,
  MaucashModal,
  MaucashChangePassword,
  MaucashProduct,
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  MaucashLogin,
  MaucashDatePicker,
  MaucashPageTable,
  MaucashValueCount,
  MaucashModal,
  MaucashChangePassword,
  MaucashProduct,
}