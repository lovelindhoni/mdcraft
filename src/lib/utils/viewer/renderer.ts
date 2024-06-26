import EmojiConvertor from 'emoji-js'; // Converts colon-text to emojis
import hljs from 'highlight.js'; // For Highlighting Code Blocks
import { Marked } from 'marked'; // For parsing note's content
import { markedSmartypants } from 'marked-smartypants';

const renderer = {
	text(text: string) {
		// Below block modifies the renderer to add support for emojis and highlighting paragraphs
		const emojis = new EmojiConvertor();
		emojis.replace_mode = 'unified'; // Outputs Unicode code points at the place of colon-text
		return emojis.replace_colons(text).replace(/==([^=]+)==/g, '<mark>$1</mark>');
	},
	link(href: string, title: string | null | undefined, text: string) {
		// Below block modifies the renderer to add the https:// protocol to the ahrefs if omitted

		href =
			// if href is not equal to null or doesn't starts with https: or http: then https is added, else href as it is
			href !== null && !href.startsWith('https://') && !href.startsWith('http://')
				? `https://${href}`
				: href;
		// if href is not equal to null then the new href is added to the <a> tag, else nothing is changed
		return href !== null
			? `<a href="${href}"${title ? ` title="${title}" ` : ''} target="_blank">${text}</a>`
			: `<a>${text}</a>`;
	},
	// Below block modifies the renderer to add lazy loading attribute
	image(href: string | null, title: string | null, text: string) {
		return `<img src="${href}" loading="lazy" alt="${text}" ${title ? `title="${title}"` : null}/>`;
	},
	// Belwo block modifies the renderer to add highlighting to code blocks
	code(code: string, language: string | undefined) {
		// when the language is unknown or not specified, then the code is detected auto-detected, pls note that this feature is so not foolproof, so always specify the language whenever you are creating fenced code block
		if (language === undefined || !hljs.getLanguage(language)) {
			const langDetect = hljs.highlightAuto(code).language;
			language = langDetect ? langDetect : 'plaintext';
		}
		return `<pre><code class="hljs language-${language}">${
			hljs.highlight(code, { language }).value
		}</code></pre>`;
	}
};
const marked = new Marked();
marked.use({ renderer });
marked.use(markedSmartypants());

export { marked };
