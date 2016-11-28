import { EOL } from 'os'

const stringTimesN = (n, char) => Array(n + 1).join(char)

// Adapted from https://gist.github.com/sente/1083506
function prettifyXml(xmlInput, options = {}) {
  const {
    indent: indentOption = 2,
  } = options
  const indentString = stringTimesN(indentOption, ' ')

  let formatted = ''
  const regex = /(>)(<)(\/*)/g
  const xml = xmlInput.replace(regex, `$1${EOL}$2$3`)
  let pad = 0
  xml.split(EOL).forEach((line) => {
    let indent = 0
    if (line.match(/.+<\/\w[^>]*>$/)) {
      indent = 0
    } else if (line.match(/^<\/\w/)) {
      // Somehow istanbul doesn't see the else case as covered, although it is. Skip it.
      /* istanbul ignore else  */
      if (pad !== 0) {
        pad -= 1
      }
    } else if (line.match(/^<\w([^>]*[^\/])?>.*$/)) {
      indent = 1
    } else {
      indent = 0
    }

    const padding = stringTimesN(pad, indentString)
    formatted += padding + line + EOL // eslint-disable-line prefer-template
    pad += indent
  })

  return formatted.trim()
}

// For non-es2015 usage
module.exports = prettifyXml
