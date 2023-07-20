<script lang="ts">
	import { currentNoteId, books, currentBookId } from '$lib/store'; // importing the stuff
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte'; // the sidebar
	import Notes from '$lib/components/notes/NotesSection.svelte';
	import Viewer from '$lib/components/viewer/Viewer.svelte';
	$: currentBookIndex = $books.findIndex((book) => book.id === $currentBookId); // finding the currentBookIndex
	$: currentNoteIndex =
		// finding the currentNoteIndex, when the id's are null then it will be -1. Its needed to squash a bug.
		$currentBookId !== null && $currentNoteId !== null
			? $books[currentBookIndex].notes.findIndex((note) => note.id === $currentNoteId)
			: -1;
</script>

<main class="layout">
	<header class="header">header</header>
	<div class="sidebar" role="menubar">
		<Sidebar />
	</div>
	<div class="editor">
		{#if $currentNoteId !== null}
			<!--i really wanted to do <svelt:component, but i could'nt do it. i pass the indexes to the components-->
			<Viewer {currentBookIndex} {currentNoteIndex} />
		{:else}
			<Notes {currentBookIndex} />
		{/if}
	</div>
</main>

<style>
	.layout {
		height: 100vh;
		box-sizing: border-box;
		display: grid;
		gap: 0.25rem;
		grid-template-rows: repeat(20, 5%);
		grid-template-columns: repeat(20, 5%);
		padding: 0.3rem;
	}

	.editor,
	.header,
	.sidebar {
		border: 0.2rem solid;
	}
	.header {
		grid-row-start: span 2;
		grid-column-start: span 7;
	}
	.sidebar {
		grid-row: 3 / span 16;
		grid-column-start: span 7;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding-left: 0.6rem;
		padding-right: 0.5rem;
	}

	.editor {
		grid-row: 1 / span 18;
		grid-column-start: span 12;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}
</style>
