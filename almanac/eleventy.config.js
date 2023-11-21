const markdownItAnchor = require('markdown-it-anchor')
const htmlmin = require('html-minifier')
const Prism = require('prismjs')

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')

const eleventyNavigationPlugin = require('./_includes/plugin-navigation')
const eleventyTOCPlugin = require('./_includes/plugin-toc')

const ELEVENTY_BUILD_MODE = process.env.ELEVENTY_RUN_MODE === 'build'

const PRISM_DEFAULT_GRAMMER = [
  'markup',
  'html',
  'xml',
  'svg',
  'mathml',
  'ssml',
  'atom',
  'rss',
  'css',
  'clike',
  'javascript',
  'js',
]

module.exports = function (eleventyConfig) {
  // Copy the contents of the `public` folder to the output folder
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  })

  // Run Eleventy when these files change:
  // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('public/**/*.{svg,webp,png,jpeg}')

  // Global Data
  eleventyConfig.addGlobalData(
    'eleventyBuildId',
    Math.random().toString(36).slice(2) + ':' + Date.now().toString(36)
  )

  // Official plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
  // Custom plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(eleventyTOCPlugin)

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib.enable(['typographer'], true)
    mdLib.disable(['linkify'], true)
    mdLib.set({
      highlight: function (str, lang) {
        if (lang === 'mermaid') {
          return `<pre class="${lang}">${str}</pre>`
        }
        if (PRISM_DEFAULT_GRAMMER.includes(lang)) {
          const strHighlight = Prism.highlight(str, Prism.languages[lang], lang)
          return `<pre class="prism"><code class="language-${lang}">${strHighlight}</code></pre>`
        }
      },
    })
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: 'after',
        class: 'heading-anchor',
        symbol: '#',
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter('slugify'),
    })
  })

  // Minify HTML
  eleventyConfig.addTransform('htmlmin', function (content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (
      ELEVENTY_BUILD_MODE &&
      !String(this.page.inputPath).endsWith('.11ty.js') &&
      this.page.outputPath &&
      this.page.outputPath.endsWith('.html')
    ) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
      })
      return minified
    }

    return content
  })

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', '11ty.js', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'liquid',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'liquid',

    // These are all optional:
    dir: {
      input: 'pages', // default: "."
      includes: '../_includes', // default: "_includes"
      layouts: '../_layouts',
      data: '../_data', // default: "_data"
      output: '_site',
    },

    // -----------------------------------------------------------------
    // Optional items:
    // -----------------------------------------------------------------

    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

    // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
    // it will transform any absolute URLs in your HTML to include this
    // folder name and does **not** affect where things go in the output folder.
    pathPrefix: '/',
  }
}
