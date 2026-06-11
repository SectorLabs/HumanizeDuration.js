// HumanizeDuration.js - https://git.io/j0HgmQ

;(function () {
  const languages = {
    ar: {
      y: function (c) { return c === 1 ? 'سنة' : 'سنوات' },
      mo: function (c) { return c === 1 ? 'شهر' : 'أشهر' },
      w: function (c) { return c === 1 ? 'أسبوع' : 'أسابيع' },
      d: function (c) { return c === 1 ? 'يوم' : 'أيام' },
      h: function (c) { return c === 1 ? 'ساعة' : 'ساعات' },
      m: function (c) { return c === 1 ? 'دقيقة' : 'دقائق' },
      s: function (c) { return c === 1 ? 'ثانية' : 'ثواني' },
      ms: function (c) { return c === 1 ? 'جزء من الثانية' : 'أجزاء من الثانية' },
      decimal: ','
    },
    de: {
      y: function (c) { return 'Jahr' + (c === 1 ? '' : 'e') },
      mo: function (c) { return 'Monat' + (c === 1 ? '' : 'e') },
      w: function (c) { return 'Woche' + (c === 1 ? '' : 'n') },
      d: function (c) { return 'Tag' + (c === 1 ? '' : 'e') },
      h: function (c) { return 'Stunde' + (c === 1 ? '' : 'n') },
      m: function (c) { return 'Minute' + (c === 1 ? '' : 'n') },
      s: function (c) { return 'Sekunde' + (c === 1 ? '' : 'n') },
      ms: function (c) { return 'Millisekunde' + (c === 1 ? '' : 'n') },
      decimal: ','
    },
    en: {
      y: function (c) { return 'year' + (c === 1 ? '' : 's') },
      mo: function (c) { return 'month' + (c === 1 ? '' : 's') },
      w: function (c) { return 'week' + (c === 1 ? '' : 's') },
      d: function (c) { return 'day' + (c === 1 ? '' : 's') },
      h: function (c) { return 'hour' + (c === 1 ? '' : 's') },
      m: function (c) { return 'minute' + (c === 1 ? '' : 's') },
      s: function (c) { return 'second' + (c === 1 ? '' : 's') },
      ms: function (c) { return 'millisecond' + (c === 1 ? '' : 's') },
      decimal: '.'
    },
    es: {
      y: function (c) { return 'año' + (c === 1 ? '' : 's') },
      mo: function (c) { return 'mes' + (c === 1 ? '' : 'es') },
      w: function (c) { return 'semana' + (c === 1 ? '' : 's') },
      d: function (c) { return 'día' + (c === 1 ? '' : 's') },
      h: function (c) { return 'hora' + (c === 1 ? '' : 's') },
      m: function (c) { return 'minuto' + (c === 1 ? '' : 's') },
      s: function (c) { return 'segundo' + (c === 1 ? '' : 's') },
      ms: function (c) { return 'milisegundo' + (c === 1 ? '' : 's') },
      decimal: ','
    },
    fr: {
      y: function (c) { return 'an' + (c >= 2 ? 's' : '') },
      mo: 'mois',
      w: function (c) { return 'semaine' + (c >= 2 ? 's' : '') },
      d: function (c) { return 'jour' + (c >= 2 ? 's' : '') },
      h: function (c) { return 'heure' + (c >= 2 ? 's' : '') },
      m: function (c) { return 'minute' + (c >= 2 ? 's' : '') },
      s: function (c) { return 'seconde' + (c >= 2 ? 's' : '') },
      ms: function (c) { return 'milliseconde' + (c >= 2 ? 's' : '') },
      decimal: ','
    },
    it: {
      y: function (c) { return c === 1 ? 'anno' : 'anni' },
      mo: function (c) { return c === 1 ? 'mese' : 'mesi' },
      w: function (c) { return c === 1 ? 'settimana' : 'settimane' },
      d: function (c) { return c === 1 ? 'giorno' : 'giorni' },
      h: function (c) { return c === 1 ? 'ora' : 'ore' },
      m: function (c) { return c === 1 ? 'minuto' : 'minuti' },
      s: function (c) { return c === 1 ? 'secondo' : 'secondi' },
      ms: function (c) { return c === 1 ? 'millisecondo' : 'millisecondi' },
      decimal: ','
    },
    nl: {
      y: 'jaar',
      mo: function (c) { return c === 1 ? 'maand' : 'maanden' },
      w: function (c) { return c === 1 ? 'week' : 'weken' },
      d: function (c) { return c === 1 ? 'dag' : 'dagen' },
      h: 'uur',
      m: function (c) { return c === 1 ? 'minuut' : 'minuten' },
      s: function (c) { return c === 1 ? 'seconde' : 'seconden' },
      ms: function (c) { return c === 1 ? 'milliseconde' : 'milliseconden' },
      decimal: ','
    },
    ru: {
      y: function (c) { return ['лет', 'год', 'года'][getSlavicForm(c)] },
      mo: function (c) { return ['месяцев', 'месяц', 'месяца'][getSlavicForm(c)] },
      w: function (c) { return ['недель', 'неделя', 'недели'][getSlavicForm(c)] },
      d: function (c) { return ['дней', 'день', 'дня'][getSlavicForm(c)] },
      h: function (c) { return ['часов', 'час', 'часа'][getSlavicForm(c)] },
      m: function (c) { return ['минут', 'минута', 'минуты'][getSlavicForm(c)] },
      s: function (c) { return ['секунд', 'секунда', 'секунды'][getSlavicForm(c)] },
      ms: function (c) { return ['миллисекунд', 'миллисекунда', 'миллисекунды'][getSlavicForm(c)] },
      decimal: ','
    },
    ur: {
      y: 'سال',
      mo: function (c) { return c === 1 ? 'مہینہ' : 'مہینے' },
      w: function (c) { return c === 1 ? 'ہفتہ' : 'ہفتے' },
      d: 'دن',
      h: function (c) { return c === 1 ? 'گھنٹہ' : 'گھنٹے' },
      m: 'منٹ',
      s: 'سیکنڈ',
      ms: 'ملی سیکنڈ',
      decimal: '.'
    },
    zh: {
      y: '年',
      mo: '个月',
      w: '周',
      d: '天',
      h: '小时',
      m: '分钟',
      s: '秒',
      ms: '毫秒',
      decimal: '.'
    }
  }

  // You can create a humanizer, which returns a function with default
  // parameters.
  function humanizer (passedOptions) {
    const result = function humanizer (ms, humanizerOptions) {
      const options = extend({}, result, humanizerOptions || {})
      return doHumanization(ms, options)
    }

    return extend(result, {
      language: 'en',
      delimiter: ', ',
      spacer: ' ',
      conjunction: '',
      serialComma: true,
      units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
      languages: {},
      round: false,
      unitMeasures: {
        y: 31557600000,
        mo: 2629800000,
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
      }
    }, passedOptions)
  }

  // The main function is just a wrapper around a default humanizer.
  const humanizeDuration = humanizer({})

  // doHumanization does the bulk of the work.
  function doHumanization (ms, options) {
    let i, len, piece

    // Make sure we have a positive number.
    // Has the nice sideffect of turning Number objects into primitives.
    ms = Math.abs(ms)

    const dictionary = options.languages[options.language] || languages[options.language]
    if (!dictionary) {
      throw new Error('No language ' + dictionary + '.')
    }

    const pieces = []

    // Start at the top and keep removing units, bit by bit.
    let unitName, unitMS, unitCount
    for (i = 0, len = options.units.length; i < len; i++) {
      unitName = options.units[i]
      unitMS = options.unitMeasures[unitName]

      // What's the number of full units we can fit?
      if (i + 1 === len) {
        unitCount = ms / unitMS
      } else {
        unitCount = Math.floor(ms / unitMS)
      }

      // Add the string.
      pieces.push({
        unitCount,
        unitName
      })

      // Remove what we just figured out.
      ms -= unitCount * unitMS
    }

    let firstOccupiedUnitIndex = 0
    for (i = 0; i < pieces.length; i++) {
      if (pieces[i].unitCount) {
        firstOccupiedUnitIndex = i
        break
      }
    }

    if (options.round) {
      let ratioToLargerUnit, previousPiece
      for (i = pieces.length - 1; i >= 0; i--) {
        piece = pieces[i]
        piece.unitCount = Math.round(piece.unitCount)

        if (i === 0) { break }

        previousPiece = pieces[i - 1]

        ratioToLargerUnit = options.unitMeasures[previousPiece.unitName] / options.unitMeasures[piece.unitName]
        if ((piece.unitCount % ratioToLargerUnit) === 0 || (options.largest && ((options.largest - 1) < (i - firstOccupiedUnitIndex)))) {
          previousPiece.unitCount += piece.unitCount / ratioToLargerUnit
          piece.unitCount = 0
        }
      }
    }

    const result = []
    for (i = 0, pieces.length; i < len; i++) {
      piece = pieces[i]
      if (piece.unitCount) {
        result.push(render(piece.unitCount, piece.unitName, dictionary, options))
      }

      if (result.length === options.largest) { break }
    }

    if (result.length) {
      if (!options.conjunction || result.length === 1) {
        return result.join(options.delimiter)
      } else if (result.length === 2) {
        return result.join(options.conjunction)
      } else if (result.length > 2) {
        return result.slice(0, -1).join(options.delimiter) + (options.serialComma ? ',' : '') + options.conjunction + result.slice(-1)
      }
    } else {
      return render(0, options.units[options.units.length - 1], dictionary, options)
    }
  }

  function render (count, type, dictionary, options) {
    let decimal
    if (options.decimal === undefined) {
      decimal = dictionary.decimal
    } else {
      decimal = options.decimal
    }

    const countStr = count.toString().replace('.', decimal)

    const dictionaryValue = dictionary[type]
    let word
    if (typeof dictionaryValue === 'function') {
      word = dictionaryValue(count)
    } else {
      word = dictionaryValue
    }

    return countStr + options.spacer + word
  }

  function extend (destination) {
    let source
    for (let i = 1; i < arguments.length; i++) {
      source = arguments[i]
      for (const prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          destination[prop] = source[prop]
        }
      }
    }
    return destination
  }

  function getSlavicForm (c) {
    if (Math.floor(c) !== c) {
      return 2
    } else if ((c % 100 >= 5 && c % 100 <= 20) || (c % 10 >= 5 && c % 10 <= 9) || c % 10 === 0) {
      return 0
    } else if (c % 10 === 1) {
      return 1
    } else if (c > 1) {
      return 2
    } else {
      return 0
    }
  }

  humanizeDuration.getSupportedLanguages = function getSupportedLanguages () {
    const result = []
    for (const language in languages) {
      if (Object.prototype.hasOwnProperty.call(languages, language)) {
        result.push(language)
      }
    }
    return result
  }

  humanizeDuration.humanizer = humanizer

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return humanizeDuration
    })
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = humanizeDuration
  } else {
    this.humanizeDuration = humanizeDuration
  }
})(); // eslint-disable-line semi
