<script lang="ts">
	import { currentNoteId, folders, currentFolderId } from '$lib/store'; // importing the stuff
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte'; // the sidebar
	import NotesSection from '$lib/components/notes/NotesSection.svelte';
	import Viewer from '$lib/components/viewer/Viewer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	$: currentFolderIndex = $folders.findIndex((folder) => folder.id === $currentFolderId); // finding the currentFolderIndex
	$: currentNoteIndex =
		// finding the currentNoteIndex, when the id's are null then it will be -1. Its needed to squash a bug.
		$currentFolderId && $currentNoteId
			? $folders[currentFolderIndex].notes.findIndex((note) => note.id === $currentNoteId)
			: -1;
	let pcDimensions = !matchMedia('(max-width:1023px)').matches;
</script>

<main class="layout">
	<Header />
	<!--two different layouts, one for mobile and tablets and another for pc and desktops-->
	{#if pcDimensions}
		<!--this layout for pc and desktops-->
		<div class="sidebar">
			<Sidebar />
		</div>
		<div class="editor">
			{#if $currentNoteId}
				<!--i really wanted to do <svelte:component, but i could'nt do it. i pass the indexes to the components-->
				<Viewer {currentFolderIndex} {currentNoteIndex} />
			{:else}
				<NotesSection {currentFolderIndex} />
			{/if}
		</div>
		<!-- and these below three are for mobile and tablets-->
	{:else if !$currentFolderId}
		<div class="sidebar">
			<Sidebar />
		</div>
	{:else if $currentFolderId && !$currentNoteId}
		<div class="editor">
			<NotesSection {currentFolderIndex} />
		</div>
	{:else if $currentNoteId}
		<div class="editor">
			<Viewer {currentFolderIndex} {currentNoteIndex} />
		</div>
	{/if}
</main>
<!--Calculates and toggles the layout of the app at viewport resize-->
<svelte:window on:resize={() => (pcDimensions = !matchMedia('(max-width: 1023px)').matches)} />

<style>
	@media (min-width: 1024px) {
		.layout {
			display: grid;
			grid-template-rows: repeat(20, 5%);
			grid-template-columns: repeat(20, 5%);
		}

		.sidebar {
			grid-row: 3 / span 18;
			grid-column-start: span 7;
			height: 100%;
		}
		.editor {
			grid-column-start: span 14;
			grid-row: 1 / span 20;
			height: 100%;
			border-left: 1px solid var(--grey-1);
		}
	}
	@media (min-width: 650px) and (max-width: 1023px) {
		.sidebar {
			height: 90%;
			padding-top: 0.5rem;
		}
		.editor {
			height: 90%;
		}
	}
	@media (min-width: 550px) and (max-width: 649px) {
		.sidebar {
			height: 90%;
			padding-top: 0.5rem;
		}
		.editor {
			height: 90%;
		}
	}
	@media (min-width: 400px) and (max-width: 549px) {
		.sidebar {
			height: 87%;
		}
		.editor {
			height: 90%;
		}
	}
	@media (max-width: 399px) {
		.sidebar {
			height: 87%;
		}
		.editor {
			height: 91%;
		}
	}
	.layout {
		height: 99.8vh;
		width: 100vw;
		box-sizing: border-box;
		font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
			'Lucida Grande', sans-serif;
		background-color: var(--background);
		color: var(--text);
	}

	.sidebar {
		box-sizing: border-box;
		padding: 0 0.5rem 0 0.6rem;
		width: 100%;
	}

	.editor {
		box-sizing: border-box;
		width: 100%;
	}
</style>
