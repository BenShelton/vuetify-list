import { expect } from 'chai'
import { createVuexWrapper } from '../helpers'

import Home from '@/views/Home.vue'
import posts from '@/store/posts'

describe('views/Home.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = createVuexWrapper(Home, {
      modules: { posts }
    })
  })

  it('should have the name "Home"', () => {
    expect(wrapper.name()).to.equal('Home')
  })
})
