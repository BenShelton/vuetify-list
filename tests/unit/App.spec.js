import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'

import App from '@/App.vue'
import routeNames from '@/router/routeNames'

describe('App.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(App, {
      stubs: {
        RouterView: true
      },
      mocks: {
        $route: {
          name: routeNames.HOME
        }
      }
    })
  })

  it('should have the name "App"', () => {
    expect(wrapper.name()).to.equal('App')
  })

  it('should show a link to home if on the post page', () => {
    const selector = 'v-btn-stub'
    expect(wrapper.contains(selector)).to.be.false
    wrapper.vm.$route.name = routeNames.POST

    const button = wrapper.find(selector)
    expect(button.exists()).to.be.true
    expect(button.props().to).to.deep.equal({ name: routeNames.HOME })
  })
})
