<script lang="ts">
	import { marked } from 'marked'; // For parsing markdown
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
	}
	let markdown = `# Happy Svelting!`; // The variable that stores the user's markdown
	// The reactive generatedHtml variable that runs the marked parser whenever markdown value changes
	$: generatedHtml = marked(markdown);
	// The prop that is used to toggle between the editor and viewer, exported to dashboard page
	export let edit: boolean;
</script>

{#if edit}
	<textarea use:focusEditor spellcheck="false" bind:value={markdown} />
{:else}
	<div class="viewer">
		{@html generatedHtml} <!-- @html is used for displaying the generatedHtml string in DOM -->
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
		word-break: break-word;
		padding: 1.4rem 2.4rem;
	}
	.viewer::-webkit-scrollbar,
	textarea::-webkit-scrollbar {
		display: none;
	}
</style>
