const pkg = require('../package.json')
const assert = require('assert')

describe('package.json', function () {
  it('has `bugs`', function () {
    assert.equal(typeof pkg.bugs, 'string')
  })

  it('is public', function () {
    assert(!pkg.private)
  })

  it('has no dependencies', function () {
    assert(!pkg.dependencies)
  })
})
