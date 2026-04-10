const humanizeDuration = require('..')
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const { parse: parseCSV } = require('csv-parse/sync')

function options (language) {
  return {
    language,
    delimiter: '+',
    units: ['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms']
  }
}

describe('localized humanization', function () {
  const definitionsPath = path.resolve(__dirname, 'definitions')
  const files = fs.readdirSync(definitionsPath)
  const languages = files.reduce(function (result, file) {
    if (path.extname(file) === '.csv') {
      result = result.concat(path.basename(file, '.csv'))
    }
    return result
  }, [])

  languages.forEach(function (language) {
    describe('for ' + language, function () {
      before(function () {
        const file = path.resolve(definitionsPath, language + '.csv')
        const data = fs.readFileSync(file, { encoding: 'utf8' })
        const rows = parseCSV(data, { delimiter: '$' })

        this.pairs = rows.map(function (r) {
          return [parseFloat(r[0]), r[1]]
        })
      })

      it('humanizes with arguments', function () {
        this.pairs.forEach(function (pair) {
          const result = humanizeDuration(pair[0], options(language))
          assert.equal(result, pair[1])
        })
      })

      it('humanizes with a humanizer', function () {
        const h = humanizeDuration.humanizer(options(language))

        this.pairs.forEach(function (pair) {
          const result = h(pair[0])
          assert.equal(result, pair[1])
        })
      })
    })
  })
})
