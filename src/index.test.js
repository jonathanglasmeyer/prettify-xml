import { EOL } from 'os'
import prettifyXml from './index'

describe('prettifyXml', () => {
  it('works', () => {
    const input = '<div><p>foo</p><p>bar</p></div>'
    const output = [
      '<div>',
      '  <p>foo</p>',
      '  <p>bar</p>',
      '</div>',
    ].join(EOL)
    const result = prettifyXml(input)
    assert(result === output)
  })

  it('single-character long tags', () => {
    const input = '<p><b><i>foo</i></b><i>bar</i></p>'
    const output = [
      '<p>',
      '  <b>',
      '    <i>foo</i>',
      '  </b>',
      '  <i>bar</i>',
      '</p>',
    ].join(EOL)
    const result = prettifyXml(input)
    assert(result === output)
  })

  it('takes indent option', () => {
    const input = '<div><p>foo</p><p>bar</p></div>'
    const output = [
      '<div>',
      '    <p>foo</p>',
      '    <p>bar</p>',
      '</div>',
    ].join(EOL)
    const result = prettifyXml(input, { indent: 4 })
    assert(result === output)
  })


  it('works for more complex input', () => {
    const input = '<div class="slick-initialized slick-slider"><div class="slick-list"><div class="slick-track"><div data-index="-1" class="slick-slide slick-cloned">Slide 3 </div><div data-index="0" class="slick-slide slick-active slick-cloned">Slide 1 </div><div data-index="1" class="slick-slide slick-cloned">Slide 2 </div><div data-index="2" class="slick-slide slick-cloned">Slide 3 </div><div data-index="3" class="slick-slide slick-active slick-cloned">Slide 1 </div></div></div></div>' // eslint-disable-line max-len
    const result = prettifyXml(input)
    const output = [
      '<div class="slick-initialized slick-slider">',
      '  <div class="slick-list">',
      '    <div class="slick-track">',
      '      <div data-index="-1" class="slick-slide slick-cloned">Slide 3 </div>',
      '      <div data-index="0" class="slick-slide slick-active slick-cloned">Slide 1 </div>',
      '      <div data-index="1" class="slick-slide slick-cloned">Slide 2 </div>',
      '      <div data-index="2" class="slick-slide slick-cloned">Slide 3 </div>',
      '      <div data-index="3" class="slick-slide slick-active slick-cloned">Slide 1 </div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join(EOL)
    assert(result === output)
  })

  it('handles non xml input', () => {
    const input = 'foo'
    const output = 'foo'
    const result = prettifyXml(input)
    assert(result === output)
  })

  it('should accept non-unix newlines', () => {
    const input = '<root>\r\n<test></test>\r\n</root>'
    const output = '<root>\n  <test>\n  </test>\n</root>'
    const result = prettifyXml(input)
    assert(result === output)
  })

  it('should use special newline if provided', () => {
    const input = '<root><test></test></root>'
    const output = '<root>\r\n  <test>\r\n  </test>\r\n</root>'
    const result = prettifyXml(input, { newline: '\r\n' })
    assert(result === output)
  })

  it('should ignore existing whitespace', () => {
    const input = '<root>\n <test></test>\n</root>'
    const output = '<root>\r\n  <test>\r\n  </test>\r\n</root>'
    const result = prettifyXml(input, { newline: '\r\n' })
    assert(result === output)
  })
})

