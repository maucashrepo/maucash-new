import MaucashValueCount from './maucash-value-count'

MaucashValueCount.install = Vue => Vue.component(MaucashValueCount.name, MaucashValueCount);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MaucashValueCount);
}

export default MaucashValueCount;