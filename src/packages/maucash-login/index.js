import MaucashLogin from './maucash-login'

MaucashLogin.install = Vue => Vue.component(MaucashLogin.name, MaucashLogin);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MaucashLogin);
}

export default MaucashLogin;