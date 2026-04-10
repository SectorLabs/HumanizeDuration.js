# humanize-duration

Fork of [EvanHahn/HumanizeDuration.js](https://github.com/EvanHahn/HumanizeDuration.js). Convert millisecond durations to English and many other languages.

## Changes from upstream

* Add `zh` and `ru` language support
* Add TypeScript declaration file
* Remove languages we don't need

## Install

```
npm install @sector-labs/humanize-duration
```

## Usage

```js
var humanizeDuration = require('@sector-labs/humanize-duration')
humanizeDuration(12000) // '12 seconds'
```

### Options

| Option | Description |
|--------|-------------|
| `language` | Language for unit display (ISO 639-1 code) |
| `delimiter` | String to display between units (default: `', '`) |
| `spacer` | String to display between value and unit (default: `' '`) |
| `largest` | Maximum number of units to display |
| `units` | Array of units to use: `['y', 'mo', 'w', 'd', 'h', 'm', 's', 'ms']` |
| `round` | Round the smallest unit (default: `false`) |
| `decimal` | String to substitute for the decimal point |
| `conjunction` | String to include before the final unit |
| `serialComma` | Use serial comma with conjunction (default: `true`) |
| `unitMeasures` | Customize the value used to calculate each unit of time |

### Humanizers

Create a humanizer with default options:

```js
var spanishHumanizer = humanizeDuration.humanizer({
  language: 'es',
  units: ['y', 'mo', 'd']
})

spanishHumanizer(71177400000)  // '2 años, 3 meses, 2 días'
```

## License

Unlicense
