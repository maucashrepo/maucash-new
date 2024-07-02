import MaucashChangePassword from './maucash-change-password';

MaucashChangePassword.install = Vue => Vue.component(MaucashChangePassword.name, MaucashChangePassword);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MaucashChangePassword);
}

export default MaucashChangePassword;