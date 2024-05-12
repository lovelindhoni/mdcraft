<!--this component connects all the comps in the viewer folder and exported to the +page.svelte-->
<script lang="ts">
	import { currentNoteId, folders } from '$lib/stores/db';
	import { onMount } from 'svelte';
	import '$lib/assets/css/atom-one-dark-reasonable.css'; // one-dark for now, suggestions welcomed
	// for code-editor highlighting component based on codejar, appended ?client to isomorphically import as a client side library (hugs to vite-iso-import plugin) to shut the window is not defined error popping at buildtime
	//@ts-ignore
	import { CodeJar } from '@novacbn/svelte-codejar?client';
	import '@fontsource/inconsolata/500.css'; //font for code-editor
	import { sanitize, addPlaceholder, highlight } from '$lib/utils/viewer'; // importing the customised renderer
	import NoteContent from '$lib/components/viewer/NoteContent.svelte';
	import Toggle from '$lib/components/viewer/Toggle.svelte';
	import BreadCrumbs from '$lib/components/viewer/BreadCrumbs.svelte';
	import Download from '$lib/components/header/Download.svelte';
	let GoBack: any = null;

	// I am dynamically importing the goback component because this is needed only for smaller screens, just to reduce some size.
	onMount(async () => {
		if (matchMedia('(max-width:1023px)').matches) {
			GoBack = (await import('$lib/components/header/GoBack.svelte')).default;
		}
	});

	export let currentFolderIndex: number; // both of these will be satisfied by the +page.svelte
	export let currentNoteIndex: number;
	// The prop that is used to toggle between the code-editor and notecontent, exported to +page
	let edit: boolean; // the variable used to toggle between the notecontent and editor.
	// the generatedHtml variable that runs whenever the edit toggle is toggled.
	let generatedHtml: string;
	$: if (!edit) {
		generatedHtml = sanitize($folders[currentFolderIndex].notes[currentNoteIndex].content);
	}
</script>

<div class="header-container">
	<!--forgive my poor choice of css classes, the header container contains the download button, the toggle and the breadcrumbs component  -->
	<div class="editor-head">
		<div class="download-container">
			<BreadCrumbs {currentFolderIndex} {currentNoteIndex} />
			{#if matchMedia('(min-width:1024px)').matches}
				<Download
					title={$folders[currentFolderIndex].notes[currentNoteIndex].title}
					content={$folders[currentFolderIndex].notes[currentNoteIndex].content}
				/>
			{/if}
		</div>
		<Toggle bind:edit on:focusEditor={() => addPlaceholder(edit)} />
	</div>
	{#if matchMedia('(max-width:1023px)').matches}
		<div class="go-back-to-notes">
			<svelte:component
				this={GoBack}
				on:click={() => currentNoteId.set(null)}
				on:keydown={() => currentNoteId.set(null)}
			/>
			<Download
				title={$folders[currentFolderIndex].notes[currentNoteIndex].title}
				content={$folders[currentFolderIndex].notes[currentNoteIndex].content}
			/>
		</div>
	{/if}
</div>
{#if edit}
	<!--on editing the code-editor is shown, otherwise, the Notecontent is shown-->

	<CodeJar
		addClosing={true}
		indentOn={/{$/}
		spellcheck={false}
		tab={'\t'}
		bind:value={$folders[currentFolderIndex].notes[currentNoteIndex].content}
		class="hljs code-editor"
		syntax="markdown"
		{highlight}
	/>
{:else}
	<NoteContent>{@html generatedHtml}</NoteContent>
{/if}

<style>
	.download-container {
		display: flex;
		align-items: center;
		gap: 1.3rem;
	}
	@media (min-width: 1740px) {
		:global(.code-editor) {
			font-size: 1.5rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		:global(.code-editor) {
			font-size: 1.3rem;
		}
	}

	@media (min-width: 1024px) and (max-width: 1429px) {
		:global(.code-editor) {
			font-size: 1.19rem;
		}
	}

	@media (min-width: 1024px) {
		.editor-head {
			padding: 1.5rem 6rem;
		}

		.header-container {
			margin-top: 1.15rem;
			height: 8%;
		}

		:global(.code-editor) {
			padding: 1rem 6rem;
			height: 86%;
		}
	}

	@media (min-width: 650px) and (max-width: 1023px) {
		.editor-head {
			padding: 1.7rem;
		}

		.go-back-to-notes {
			padding: 0 1.7rem 1.7rem;
		}

		.header-container {
			width: 68%;
			height: 15%;
			margin: 0 auto;
		}

		:global(.code-editor) {
			padding: 2rem 20vw;
			height: 82%;
			font-size: 1.34rem;
		}
	}

	@media (min-width: 550px) and (max-width: 649px) {
		.editor-head {
			padding: 1.7rem;
		}

		.go-back-to-notes {
			padding: 0 1.7rem 1.7rem;
		}

		.header-container {
			width: 80%;
			height: 15%;
			margin: 0 auto;
		}

		:global(.code-editor) {
			padding: 2rem 15vw;
			height: 83%;
			font-size: 1.32rem;
		}
	}

	@media (max-width: 549px) {
		.editor-head {
			padding: 0 1.6rem;
		}

		.header-container {
			height: 19%;
		}

		.go-back-to-notes {
			padding: 0 1.9rem 1.7rem;
		}

		:global(.code-editor) {
			padding: 1rem 8vw 2rem;
			height: 77.5%;
			font-size: 1.1rem;
		}
	}

	:global(.code-editor) {
		width: 100%;
		box-sizing: border-box;
		overflow-y: auto;
		resize: none;
		overflow-wrap: break-word;
		outline: none;
		border: none;
		background-color: var(--background);
		line-height: 1.5;
		color: var(--text);
		font-family: 'Inconsolata', monospace !important;
	}
	:global(.code-editor:empty:before) {
		/* when the code editor is empty, then the data-placeholder is used as the content*/
		content: attr(data-placeholder);
		color: var(--grey-1);
	}
	.editor-head {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		justify-content: space-between;
	}

	.header-container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.go-back-to-notes {
		display: flex;
		justify-content: space-between;
	}
</style>
