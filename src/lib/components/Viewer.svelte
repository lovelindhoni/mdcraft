<script lang="ts">
	import { books, currentBookIndex, currentNoteIndex } from '$lib/store';
	import { marked } from 'marked'; // For parsing $books[$currentBookIndex].notes[$currentNoteIndex].content
	import EmojiConvertor from 'emoji-js'; // Converts colon-text to emojis
	import hljs from 'highlight.js'; // For Highlighting Code Blocks
	import 'highlight.js/styles/atom-one-dark.css'; // I prefer One-Dark theme
	import { afterUpdate } from 'svelte'; // Run Highlighting for code blocks after DOM update
	const emojis = new EmojiConvertor();
	emojis.replace_mode = 'unified'; // Outputs Unicode code points at the place of colon-text
	const renderer = new marked.Renderer();
	// Below line modifies the renderer to add support for emojis and highlighting paragraphs
	renderer.text = (text) => emojis.replace_colons(text).replace(/==([^=]+)==/g, '<mark>$1</mark>');
	// Below block modifies the renderer to add the https:// protocol to the ahrefs if omitted
	renderer.link = (href, title, text) => {
		href =
			// if href is not equal to null or doesn't starts with https: or http: then https is added, else href as it is
			href !== null && !href.startsWith('https://') && !href.startsWith('http://')
				? `https://${href}`
				: href;
		// if href is not equal to null then the new href is added to the <a> tag, else nothing is changed
		return href !== null
			? `<a href="${href}"${title ? ` title="${title}" ` : ''} target="_blank">${text}</a>`
			: `<a>${text}</a>`;
	};
	marked.setOptions({ renderer }); // Stuffing the new renderer to the parser
	afterUpdate(() => hljs.highlightAll()); // HighlightAll does automatic lang-detection on code blocks
	function focusEditor(node: HTMLTextAreaElement) {
		node.focus(); // Focuses the textarea if it is present on DOM using the svetle action
		return {
			destroy() {
				node.blur();
			}
		};
	}
	// The reactive generatedHtml variable that runs the marked parser whenever value changes
	$: generatedHtml = marked($books[$currentBookIndex].notes[$currentNoteIndex].content);
	// The prop that is used to toggle between the editor and viewer, exported to dashboard page
	export let edit: boolean;
</script>

{#if edit}
	<textarea
		use:focusEditor
		spellcheck="false"
		bind:value={$books[$currentBookIndex].notes[$currentNoteIndex].content}
	/>
{:else}
	<div class="viewer">
		{@html generatedHtml}
		<!-- @html is used for displaying the generatedHtml string in DOM -->
	</div>
{/if}

<style>
	/* Some shitty styles for the textarea and the viewer*/
	textarea,
	.viewer {
		height: 100%;
		width: 100%;
		overflow-y: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
		border: 1px solid;
		box-sizing: border-box;
	}
	textarea {
		resize: none;
		word-wrap: break-word;
		font-size: 1.3rem;
		outline: none;
		padding: 2rem 2.5rem;
	}

	.viewer {
		overflow-wrap: break-word;
		padding: 1.4rem 2.4rem;
	}
	.viewer::-webkit-scrollbar,
	textarea::-webkit-scrollbar {
		display: none;
	}
	/*Styles for the generated Html*/

	:global(h1) {
		font-size: 2.2rem;
	}
	:global(h2) {
		font-size: 1.75rem;
	}
	:global(h3) {
		font-size: 1.3rem;
	}
	:global(h4) {
		font-size: 1.15rem;
	}
	:global(h5) {
		font-size: 0.92rem;
	}
	:global(h6) {
		font-size: 0.74rem;
	}
	:global(p, ol, ul, mark, a, del) {
		font-size: 1.18rem;
		line-height: 1.15;
	}
	:global(.viewer) {
		font-family: Arial, Helvetica, sans-serif;
	}
	:global(table) {
		font-size: 1.09rem;
	}
	:global(mark) {
		padding: 0.11rem;
		border-radius: 0.4rem;
	}
	:global(table) {
		border-collapse: collapse;
		width: 100%;
		overflow-wrap: break-word;
	}
	:global(table th),
	:global(table td) {
		padding: 0.7rem;
		text-align: left;
		border: 0.12rem solid black;
	}
	:global(a) {
		color: #3a0ca3;
	}
	:global(blockquote) {
		background-color: #f9f9f9;
		border-left: 10px solid #ccc;
		padding: 0.02rem 1rem;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		color: #2d2d2d;
	}
	:global(img) {
		height: auto;
		width: auto;
		max-width: 100%;
		max-height: 25em;
	}
	:global(code) {
		padding: 0.14rem;
		background-color: lightgray;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
	:global(pre span) {
		font-size: 0.95rem;
	}
	:global(pre code) {
		font-size: 0.95rem;
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
	:global(pre span) {
		font-size: 0.95rem;
	}
	:global(pre code) {
		font-size: 0.95rem;
	}
</style>
