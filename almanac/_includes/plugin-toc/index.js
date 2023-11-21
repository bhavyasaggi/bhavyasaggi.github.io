const htmlparser2 = require('htmlparser2')

function getHeadingsFromHtml(content) {
  const headings = []

  let isHeading = false

  const parser = new htmlparser2.Parser({
    onopentag(name, attributes) {
      if (['h1', 'h2', 'h3'].includes(name.toLowerCase()) && attributes.id) {
        isHeading = true
        const openHead = {
          id: attributes.id,
          level: name.replace(/[^\d]/g, ''),
          text: '',
        }
        headings.push(openHead)
      }
    },
    ontext(data) {
      if (isHeading) {
        const lastHeading = headings[Math.max(headings.length - 1, 0)]
        if (
          lastHeading &&
          (!lastHeading.text || lastHeading.text.length < 60)
        ) {
          lastHeading.text = (lastHeading.text + data).slice(0, 60)
        }
      }
    },
    onclosetag() {
      isHeading = false
    },
  })

  parser.write(content)
  parser.end()

  return headings
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('eleventyTOC', (content) => {
    const headings = getHeadingsFromHtml(content)
    return headings
  })
}
