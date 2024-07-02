import MaucashDatePicker from './maucash-date-picker'

MaucashDatePicker.install = Vue => Vue.component(MaucashDatePicker.name, MaucashDatePicker);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MaucashDatePicker);
}

export default MaucashDatePicker;