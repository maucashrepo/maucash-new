import MaucashModal from './maucash-modal'

MaucashModal.install = Vue => Vue.component(MaucashModal.name, MaucashModal);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MaucashModal);
}

export default MaucashModal;