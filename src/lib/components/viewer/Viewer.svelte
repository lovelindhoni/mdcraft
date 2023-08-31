<!--this component connects all the comps in the viewer folder and exported to the dashboard-->
<script lang="ts">
	import { folders } from '$lib/store';
	import { marked } from 'marked'; // For parsing note's content
	import EmojiConvertor from 'emoji-js'; // Converts colon-text to emojis
	import hljs from 'highlight.js'; // For Highlighting Code Blocks
	import 'highlight.js/styles/base16/dracula.css'; // dracula theme for now
	import NoteContent from '$lib/components/viewer/NoteContent.svelte';
	import { afterUpdate } from 'svelte'; // Run Highlighting for code blocks after DOM update
	import Toggle from '$lib/components/viewer/Toggle.svelte';
	import Pagination from '$lib/components/viewer/Pagination.svelte';
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

	export let currentFolderIndex: number; // both of these will be satisfied by the +page.svelte
	export let currentNoteIndex: number;
	// The prop that is used to toggle between the textarea and notecontent, exported to +page
	let edit: boolean; // the variable used to toggle between the notecontent and editor.
	// the generatedHtml variable that runs whenever the content is changed.
	$: generatedHtml = marked($folders[currentFolderIndex].notes[currentNoteIndex].content);
</script>

<div role="columnheader" class="editor-head">
	<!--i have used the svelte:component to show the dynamically imported toggle and pagination-->
	<Pagination {currentFolderIndex} {currentNoteIndex} />
	<Toggle bind:edit />
</div>
{#if edit}
	<!--on editing the textarea is shown, otherwise, the Notecontent is shown-->
	<!--uses the focuseditor and the note's content is binded to this textarea-->
	<textarea
		placeholder="Start Sparkdowning..."
		spellcheck="false"
		bind:value={$folders[currentFolderIndex].notes[currentNoteIndex].content}
	/>
{:else}
	<NoteContent>{@html generatedHtml}</NoteContent>
{/if}

<style>
	@media screen and (min-width: 1740px) {
		textarea {
			font-size: 1.6rem;
		}
	}
	@media screen and (min-width: 1440px) and (max-width: 1739px) {
		textarea {
			font-size: 1.31rem;
		}
	}
	@media screen and (max-width: 1439px) {
		textarea {
			font-size: 1.15rem;
		}
	}
	@media screen and (min-width: 1024px) {
		.editor-head {
			justify-content: space-between;
			padding-left: 2.6rem;
			padding-right: 2.3rem;
			margin-top: 1.5rem;
			height: 8%;
		}
		textarea {
			padding: 1rem 2.5rem;
			height: 87%;
		}
	}
	@media screen and (min-width: 650px) and (max-width: 1023px) {
		.editor-head {
			justify-content: space-around;
			width: 68%;
			height: 8%;
			margin-right: auto;
			margin-left: auto;
		}
		textarea {
			padding: 2rem 20vw;
			height: 88%;
			font-size: 1.27rem;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 649px) {
		.editor-head {
			justify-content: space-around;
			width: 80%;
			height: 8%;
			margin-right: auto;
			margin-left: auto;
		}
		textarea {
			padding: 2rem 15vw;
			height: 91%;
			font-size: 1.27rem;
		}
	}
	@media screen and (max-width: 549px) {
		.editor-head {
			justify-content: space-around;
			height: 11%;
		}
		textarea {
			padding-top: 1rem;
			padding-bottom: 2rem;
			padding-left: 8vw;
			padding-right: 8vw;
			height: 88%;
			font-size: 1.05rem;
		}
	}
	textarea {
		width: 100%;
		box-sizing: border-box;
		overflow-y: auto;
		resize: none;
		word-wrap: break-word;
		outline: none;
		border: none;
		background-color: var(--background);
		font-family: monospace !important; /**Sorry...*/
		line-height: 1.5;
	}
	textarea::placeholder {
		color: hsl(0, 0%, 60%);
	}
	.editor-head {
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
</style>
