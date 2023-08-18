<!--this component connects all the comps in the viewer folder and exported to the dashboard-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId, focusInput } from '$lib/store';
	import { marked } from 'marked'; // For parsing note's content
	import EmojiConvertor from 'emoji-js'; // Converts colon-text to emojis
	import hljs from 'highlight.js'; // For Highlighting Code Blocks
	import 'highlight.js/styles/base16/dracula.css'; // One-Dark theme for now
	import { afterUpdate, onMount } from 'svelte'; // Run Highlighting for code blocks after DOM update
	let Pagination: any; // sorry typescript, this variable hold teh dynamic imported pagination
	let Toggle: any; // this variable holds the dynamic imported component
	onMount(async () => {
		// imports the toggle comp asyncly so that it could be lazy loaded
		Toggle = (await import('$lib/components/viewer/Toggle.svelte')).default;
		Pagination = (await import('$lib/components/viewer/Pagination.svelte')).default;
	});
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
	// The reactive generatedHtml variable that runs the marked parser whenever value changes.Only runs when the id's are not null.
	$: generatedHtml =
		$currentFolderId !== null && $currentNoteId !== null
			? marked($folders[currentFolderIndex].notes[currentNoteIndex].content)
			: '';
	// The prop that is used to toggle between the editor and viewer, exported to dashboard page
	let edit: boolean; // the variable used to toggle between teh viewer and editor.
</script>

<div role="columnheader" class="editor-head">
	<!--i have used the svelte:component to show the dynamically imported toggle and pagination-->
	<svelte:component this={Pagination} {currentFolderIndex} {currentNoteIndex} />
	<svelte:component this={Toggle} bind:edit />
</div>
{#if edit}
	<!--on editing the textarea is shown, otherwise, the viewer is shown-->
	<!--uses the focuseditor and the note's content is binded to this textarea-->
	<textarea
		placeholder="Start Sparkdowning..."
		spellcheck="false"
		use:focusInput
		bind:value={$folders[currentFolderIndex].notes[currentNoteIndex].content}
	/>
{:else}
	<div class="viewer">
		{@html generatedHtml}
		<!-- @html is used for displaying the generatedHtml string in DOM -->
	</div>
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
	textarea,
	.viewer {
		height: 87%;
		width: 100%;
		box-sizing: border-box;
		overflow-y: auto;
		padding: 1rem 2.5rem;
	}
	textarea {
		resize: none;
		word-wrap: break-word;
		outline: none;
		border: none;
		background-color: var(--background);
		font-family: monospace !important; /**Sorry...*/
	}
	textarea::placeholder {
		color: hsl(0, 0%, 60%);
	}
	.viewer {
		overflow-wrap: break-word;
	}
	.editor-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 8%;
		padding-left: 2.6rem;
		padding-right: 2.3rem;
		margin-top: 1.5rem;
	}
	/*Styles for the generated Html*/
	@media screen and (min-width: 1740px) {
		:global(.viewer h1) {
			font-size: 3rem;
		}
		:global(.viewer h2) {
			font-size: 2.4rem;
		}
		:global(.viewer h3) {
			font-size: 2rem;
		}
		:global(.viewer h4) {
			font-size: 1.6rem;
		}
		:global(.viewer h5) {
			font-size: 1.2rem;
		}
		:global(.viewer h6) {
			font-size: 1.1rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.7rem;
		}
		:global(.viewer code) {
			font-size: 1.55rem;
		}
		:global(.viewer table) {
			font-size: 1.53rem;
		}
		:global(pre span) {
			font-size: 1.5rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		:global(.viewer h1) {
			font-size: 2.4rem;
		}
		:global(.viewer h2) {
			font-size: 2.1rem;
		}
		:global(.viewer h3) {
			font-size: 1.7rem;
		}
		:global(.viewer h4) {
			font-size: 1.4rem;
		}
		:global(.viewer h5) {
			font-size: 1rem;
		}
		:global(.viewer h6) {
			font-size: 0.92rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.35rem;
		}
		:global(.viewer code) {
			font-size: 1.25rem;
		}
		:global(.viewer table) {
			font-size: 1.25rem;
		}
		:global(pre span) {
			font-size: 1.26rem;
		}
	}
	@media screen and (max-width: 1429px) {
		:global(.viewer h1) {
			font-size: 2.2rem;
		}
		:global(.viewer h2) {
			font-size: 1.7rem;
		}
		:global(.viewer h3) {
			font-size: 1.4rem;
		}
		:global(.viewer h4) {
			font-size: 1.15rem;
		}
		:global(.viewer h5) {
			font-size: 0.92rem;
		}
		:global(.viewer h6) {
			font-size: 0.74rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.2rem;
		}
		:global(.viewer code) {
			font-size: 1rem;
		}
		:global(.viewer table) {
			font-size: 1.15rem;
		}
		:global(pre span) {
			font-size: 1.08rem;
		}
	}
	:global(.viewer p),
	:global(.viewer ol),
	:global(.viewer ul),
	:global(.viewer mark),
	:global(.viewer a),
	:global(.viewer del),
	:global(.viewer em),
	:global(.viewer strong) {
		line-height: 1.15;
	}
	:global(.viewer mark) {
		padding: 0.11rem;
		border-radius: 0.4rem;
	}
	:global(.viewer table) {
		border-collapse: collapse;
		width: 100%;
		overflow-wrap: break-word;
	}
	:global(.viewer table th),
	:global(.viewer table td) {
		padding: 0.7rem;
		text-align: left;
		border: 0.12rem solid black;
	}
	:global(.viewer a) {
		color: var(--vibrant-purple);
	}
	:global(.viewer blockquote) {
		background-color: hsl(0, 0%, 94%);
		border-left: 10px solid hsl(0, 0%, 80%);
		padding: 0.02rem 1rem;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		color: var(--blue-grey);
	}
	:global(.viewer img) {
		height: auto;
		width: auto;
		max-width: 100%;
		max-height: 21em;
	}
	:global(code) {
		padding: 0.14rem;
		background-color: lightgray;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
	:global(pre code) {
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
