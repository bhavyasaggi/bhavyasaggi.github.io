const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')

const eleventyNavigationPlugin = require('./_includes/plugin-navigation')

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

  // Official plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  // Customize Markdown library settings:
  // eleventyConfig.amendLibrary("md", mdLib => {
  // 	mdLib.use(markdownItAnchor, {
  // 		permalink: markdownItAnchor.permalink.ariaHidden({
  // 			placement: "after",
  // 			class: "header-anchor",
  // 			symbol: "#",
  // 			ariaHidden: false,
  // 		}),
  // 		level: [1,2,3,4],
  // 		slugify: eleventyConfig.getFilter("slugify")
  // 	});
  // });

  // Features to make your build faster (when you need them)

  // If your passthrough copy gets heavy and cumbersome, add this line
  // to emulate the file copy on the dev server. Learn more:
  // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

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
