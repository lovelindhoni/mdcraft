<script lang="ts">
	import { currentNoteId, folders, currentFolderId } from '$lib/store'; // importing the stuff
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte'; // the sidebar
	import NotesSection from '$lib/components/notes/NotesSection.svelte';
	import Viewer from '$lib/components/viewer/Viewer.svelte';
	$: currentFolderIndex = $folders.findIndex((folder) => folder.id === $currentFolderId); // finding the currentFolderIndex
	$: currentNoteIndex =
		// finding the currentNoteIndex, when the id's are null then it will be -1. Its needed to squash a bug.
		$currentFolderId !== null && $currentNoteId !== null
			? $folders[currentFolderIndex].notes.findIndex((note) => note.id === $currentNoteId)
			: -1;
</script>

<main class="layout">
	<header>Sparkdown</header>
	<div class="sidebar" role="menubar">
		<Sidebar />
	</div>
	<div class="editor">
		{#if $currentNoteId !== null}
			<!--i really wanted to do <svelt:component, but i could'nt do it. i pass the indexes to the components-->
			<Viewer {currentFolderIndex} {currentNoteIndex} />
		{:else}
			<NotesSection {currentFolderIndex} />
		{/if}
	</div>
</main>

<style>
	.layout {
		height: 100vh;
		width: 100vw;
		display: grid;
		box-sizing: border-box;
		grid-template-rows: repeat(20, 5%);
		grid-template-columns: repeat(20, 5%);
		background-color: var(--background);
		font-family: Arial, Helvetica, sans-serif;
	}
	header {
		grid-row-start: span 2;
		grid-column-start: span 7;
		background-color: transparent;
		display: flex;
		align-items: center;
		color: var(--purple);
		font-size: 2.5rem;
		margin-top: 1.5rem;
		padding-left: 1rem;
	}
	.sidebar {
		grid-row: 3 / span 19;
		grid-column-start: span 7;
		height: 96.5%;
		width: 100%;
		padding-left: 0.6rem;
		padding-right: 0.5rem;
		margin-top: 1.2rem;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.editor {
		grid-row: 1 / span 20;
		grid-column-start: span 13;
		height: 100%;
		width: 100%;
		border-left: 2px solid var(--light-purple);
		box-sizing: border-box;
	}
</style>
