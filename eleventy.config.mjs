import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";

export default async function (eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/simpledotcss/simple.min.css": "/css/simple.css",
		"./node_modules/feather-icons/dist/feather-sprite.svg":
			"/feather-sprite.svg",
		"./node_modules/mermaid/dist/mermaid.min.js": "/js/mermaid.js",
		"./node_modules/prismjs/themes/prism-okaidia.min.css": "/css/prism.css",
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("public/**/*.{svg,webp,png,jpeg}");

	// Global Data
	eleventyConfig.addGlobalData(
		"eleventyBuildId",
		`${Math.random().toString(36).slice(2)}:${Date.now().toString(36)}`,
	);

	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);

	// Icon shortcode
	eleventyConfig.addShortcode(
		"icon",
		(name, size = "24") =>
			`<svg viewBox="0 0 24 24" width="${size}" height="${size}" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}"><use href="/feather-sprite.svg#${name}"></use></svg>`,
	);

	// Navigation to JSON filter
	eleventyConfig.addFilter("eleventyNavigationToJson", (navigation) => {
		const convertItem = (item) => ({
			key: item.key,
			url: item.url,
			title: item.title,
			children: item.children ? item.children.map(convertItem) : [],
		});
		return navigation.map(convertItem);
	});

	// Configure markdown-it for better mermaid support
	const md = markdownIt({ html: true, linkify: true, typographer: true });
	eleventyConfig.setLibrary("md", md);

	return {
		dir: {
			input: "pages",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data",
			output: "_site",
		},
	};
}
