import hljs from 'highlight.js/lib/core';
import markdown from 'highlight.js/lib/languages/markdown';

hljs.registerLanguage('markdown', markdown); // registering markdown
const highlight = (code: string) =>
	// highlighting the code-string using highlightjs api
	hljs.highlight(code, {
		language: 'markdown'
	}).value;

export { highlight };
