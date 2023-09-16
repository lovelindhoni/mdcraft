<!--this component connects all the comps in the viewer folder and exported to the +page.svelte-->
<script lang="ts">
	import { currentNoteId, folders } from '$lib/store';
	import { onMount } from 'svelte';
	import { marked } from 'marked'; // For parsing note's content
	import renderer from './customRenderer'; // importing the customised renderer
	import '@fontsource/inconsolata/500.css'; // font for textarea
	import NoteContent from '$lib/components/viewer/NoteContent.svelte';
	import Toggle from '$lib/components/viewer/Toggle.svelte';
	import Pagination from '$lib/components/viewer/Pagination.svelte';
	import Download from '$lib/components/header/Download.svelte';
	let GoBack: any = null;
	// I am dynamically importing the goback component because this is needed only for smaller screens, just to reduce some size.
	onMount(async () => {
		if (matchMedia('(max-width:1023px)').matches) {
			GoBack = (await import('$lib/components/header/GoBack.svelte')).default;
		}
	});
	marked.use({ renderer }); // using the new customised renderer

	export let currentFolderIndex: number; // both of these will be satisfied by the +page.svelte
	export let currentNoteIndex: number;
	// The prop that is used to toggle between the textarea and notecontent, exported to +page
	let edit: boolean; // the variable used to toggle between the notecontent and editor.
	// the generatedHtml variable that runs whenever the content is changed.
	$: generatedHtml = marked($folders[currentFolderIndex].notes[currentNoteIndex].content);
</script>

<div class="header-container">
	<!--forgive my poor choice of css classes, the header container contains the download button, the toggle and the pagination component  -->
	<div class="editor-head">
		<div class="download-container">
			<Pagination {currentFolderIndex} {currentNoteIndex} />
			{#if matchMedia('(min-width:1024px)').matches}
				<Download
					title={$folders[currentFolderIndex].notes[currentNoteIndex].title}
					content={$folders[currentFolderIndex].notes[currentNoteIndex].content}
				/>
			{/if}
		</div>
		<Toggle bind:edit />
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
	<!--on editing the textarea is shown, otherwise, the Notecontent is shown-->
	<!--uses the focuseditor and the note's content is binded to this textarea-->
	<!--@ts-ignore-->
	<textarea
		placeholder="Start Sparkdowning..."
		spellcheck="false"
		bind:value={$folders[currentFolderIndex].notes[currentNoteIndex].content}
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
		textarea {
			font-size: 1.65rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		textarea {
			font-size: 1.36rem;
		}
	}

	@media (max-width: 1429px) {
		textarea {
			font-size: 1.19rem;
		}
	}

	@media (min-width: 1024px) {
		.editor-head {
			padding: 1.5rem 2.3rem;
		}

		.header-container {
			margin-top: 1.15rem;
			height: 8%;
		}

		textarea {
			padding: 1rem 2.5rem;
			height: 87%;
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

		textarea {
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

		textarea {
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

		textarea {
			padding: 1rem 8vw 2rem;
			height: 77.5%;
			font-size: 1.1rem;
		}
	}

	textarea {
		width: 100%;
		box-sizing: border-box;
		overflow-y: auto;
		resize: none;
		overflow-wrap: anywhere;
		outline: none;
		border: none;
		background-color: var(--background);
		line-height: 1.5;
		color: var(--text);
		font-family: 'Inconsolata', monospace !important;
	}
	textarea::placeholder {
		color: hsl(0, 0%, 60%);
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
