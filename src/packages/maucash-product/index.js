import MaucashProduct from './maucash-product'

MaucashProduct.install = Vue => Vue.component(MaucashProduct.name, MaucashProduct);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MaucashProduct);
}

export default MaucashProduct;