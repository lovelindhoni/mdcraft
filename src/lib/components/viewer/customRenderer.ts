import EmojiConvertor from 'emoji-js'; // Converts colon-text to emojis

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
	heading(text: string, level: number, raw: string) {
		// this is exactly the code from https://github.com/markedjs/marked-custom-heading-id but unfortunately it doesnt have any types at the time of my checking, so i used that code like this here.
		const headingIdRegex = /(?: +|^)\{#([a-z][\w-]*)\}(?: +|$)/i;
		const hasId = text.match(headingIdRegex);
		if (!hasId) {
			// fallback to original heading
			return raw;
		}
		return `<h${level} id="${hasId[1]}">${text.replace(headingIdRegex, '')}</h${level}>\n`;
	}
};
export default renderer;
