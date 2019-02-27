import { expect } from 'chai'
import { createVuexWrapper } from '../helpers'

import Post from '@/views/Post.vue'
import post from '@/store/post'

describe('views/Post.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = createVuexWrapper(Post, {
      modules: { post }
    },
    {
      mocks: {
        $route: {
          params: {
            id: 42
          }
        }
      }
    })
  })

  it('should have the name "Post"', () => {
    expect(wrapper.name()).to.equal('Post')
  })
})
