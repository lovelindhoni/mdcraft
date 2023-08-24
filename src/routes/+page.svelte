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
	let isSmallScreen = matchMedia('(max-width:830px)').matches;
</script>

<main class="layout">
	<header>Sparkdown</header>
	<div class="sidebar" role="menubar">
		<Sidebar />
	</div>
	{#if !isSmallScreen}
		<div class="editor">
			{#if $currentNoteId !== null}
				<!--i really wanted to do <svelte:component, but i could'nt do it. i pass the indexes to the components-->
				<Viewer {currentFolderIndex} {currentNoteIndex} />
			{:else}
				<NotesSection {currentFolderIndex} />
			{/if}
		</div>
	{/if}
</main>

<style>
	@media screen and (min-width: 1740px) {
		header {
			font-size: 3.6rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		header {
			font-size: 3.1rem;
		}
	}
	@media screen and (min-width: 1151px) and (max-width: 1429px) {
		header {
			font-size: 2.5rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1150px) {
		header {
			font-size: 2.3rem;
		}
	}
	@media screen and (min-width: 1024px) {
		.layout {
			display: grid;
			grid-template-rows: repeat(20, 5%);
			grid-template-columns: repeat(20, 5%);
		}
		header {
			height: 100%;
			grid-row-start: span 2;
			grid-column-start: span 7;
			padding-top: 1rem;
			padding-left: 2rem;
		}
		.sidebar {
			grid-row: 3 / span 18;
			grid-column-start: span 7;
			height: 100%;
		}
		.editor {
			grid-column-start: span 14;
			grid-row: 1 / span 20;
		}
	}
	@media screen and (min-width: 650px) and (max-width: 1023px) {
		header {
			width: 68%;
			margin-left: auto;
			margin-right: auto;
			height: 10%;
			font-size: 3.2rem;
			padding-top: 1rem;
			padding-left: 1.6rem;
		}
		.sidebar {
			height: 90%;
			padding-top: 0.5rem;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 649px) {
		header {
			width: 80%;
			margin-left: auto;
			margin-right: auto;
			height: 10%;
			font-size: 3.1rem;
			padding-top: 1rem;
			padding-left: 1.6rem;
		}
		.sidebar {
			height: 90%;
			padding-top: 0.5rem;
		}
	}
	@media screen and (min-width: 400px) and (max-width: 549px) {
		header {
			width: 100%;
			height: 10%;
			font-size: 2.34rem;
			padding-top: 1rem;
			padding-left: 1.6rem;
		}
		.sidebar {
			height: 87%;
		}
	}
	@media screen and (max-width: 399px) {
		header {
			width: 100%;
			height: 9%;
			font-size: 2.1rem;
			padding-top: 1rem;
			padding-left: 1.6rem;
		}
		.sidebar {
			height: 87%;
		}
	}
	.layout {
		height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		font-family: Helvetica, Arial, sans-serif;
	}
	header {
		background-color: transparent;
		display: flex;
		align-items: center;
		color: var(--purple);
		box-sizing: border-box;
		cursor: default;
	}
	.sidebar {
		box-sizing: border-box;
		padding-left: 0.6rem;
		padding-right: 0.5rem;
		width: 100%;
	}

	.editor {
		border-left: 2px solid var(--light-purple);
		box-sizing: border-box;
		height: 100%;
		width: 100%;
	}
</style>
