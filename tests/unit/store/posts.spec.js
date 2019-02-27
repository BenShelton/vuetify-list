import { expect } from 'chai'

import posts from '@/store/posts'

describe('store/posts', () => {
  it('should be namespaced', () => {
    expect(posts.namespaced).to.be.true
  })

  describe('Getters', () => {
    describe('pagination', () => {
      it('should return the correct fields from state', () => {
        const page = 42
        const rowsPerPage = 100
        const sortBy = 'field'
        const descending = false

        const state = { list: [], id: 64, page, rowsPerPage, sortBy, descending }
        const output = { page, rowsPerPage, sortBy, descending }
        expect(posts.getters.pagination(state)).to.deep.equal(output)
      })
    })
  })

  describe('Mutations', () => {
    describe('START_LOADING', () => {
      it('should set a loading state without affecting the list', () => {
        const state = { list: [{}], loading: false, error: 'error' }
        const output = { list: [{}], loading: true, error: null }
        posts.mutations.START_LOADING(state)
        expect(state).to.deep.equal(output)
      })
    })
  })
})
