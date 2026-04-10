const getSupportedLanguages = require('..').getSupportedLanguages
const assert = require('assert')
const fs = require('fs')
const path = require('path')

describe('getSupportedLanguages', function () {
  it('lists all supported languages', function (done) {
    const definitionsPath = path.resolve(__dirname, 'definitions')

    fs.readdir(definitionsPath, function (err, files) {
      if (err) { throw err }

      const languages = files.filter(function (file) {
        return path.extname(file) === '.csv'
      }).map(function (file) {
        return path.basename(file, '.csv')
      })

      assert.deepEqual(languages.sort(), getSupportedLanguages().sort())

      done()
    })
  })

  it('returns a different array each time', function () {
    assert.notEqual(getSupportedLanguages(), getSupportedLanguages())
  })
})
