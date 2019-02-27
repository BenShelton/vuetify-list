import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

export function createVuexWrapper (component, store, options) {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  return shallowMount(component, {
    localVue,
    store: new Vuex.Store(store),
    ...options
  })
}
