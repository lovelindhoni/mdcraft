import sanitizeHtml from 'sanitize-html'; // for sanitizing user input markdown
import { marked } from './renderer';
const allowedAttributes = {
	a: ['href', 'target', 'title'],
	img: ['src', 'alt', 'loading', 'title'],
	input: [{ name: 'type', values: ['checkbox'] }, 'checked', 'disabled'],
	span: ['style', 'class', 'id'],
	code: ['style', 'class', 'id'],
	pre: ['class', 'style']
};
const allowedTags = [
	'img',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'p',
	'a',
	'hr',
	'br',
	'code',
	'pre',
	'ul',
	'li',
	'ol',
	'mark',
	'del',
	'caption',
	'col',
	'colgroup',
	'table',
	'tbody',
	'td',
	'tfoot',
	'th',
	'thead',
	'tr',
	'blockquote',
	'strong',
	'em',
	'input',
	'span',
	'div'
];

const sanitize = (html: string) => {
	const dirtyHtml = marked.parse(html) as string;
	const sanitizedHtml = sanitizeHtml(dirtyHtml, { allowedAttributes, allowedTags });
	return sanitizedHtml;
};

export { sanitize };
