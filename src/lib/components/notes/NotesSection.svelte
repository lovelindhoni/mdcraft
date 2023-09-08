<!--this connects all the comps in the notes folder. it will be impported to the dashboard-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // importing the folders and the id's
	import CreateNote from '$lib/components/notes/CreateNote.svelte';
	import Note from '$lib/components/notes/Note.svelte';
	import NoNotes from '$lib/components/notes/NoNotes.svelte';
	import PickFolder from '$lib/components/notes/PickFolder.svelte';
	import GoBack from '$lib/components/GoBack.svelte';
	export let currentFolderIndex: number; // fulfilled by the +page.svelte
</script>

{#if $currentFolderId}
	<!--incase if any Folder are selected-->
	<div role="menu" class="notes-and-title">
		<!---->
		{#if ($folders[currentFolderIndex].notes.length > 0 && matchMedia('(min-width:1024px)').matches) || matchMedia('(max-width:1023px)').matches}
			<div class="mast" role="group">
				{#if matchMedia('(max-width:1023px').matches}
					<GoBack
						on:click={() => currentFolderId.set(null)}
						on:keydown={() => currentFolderId.set(null)}
					/>
				{/if}
				<div class="title-btn">
					<h1>{@html $folders[currentFolderIndex].title.replace(/ /g, '&nbsp;')}</h1>
					<!--the regex to preserve the whitespaces-->
					<!--the title of that Folder-->
					<svelte:component this={CreateNote} {currentFolderIndex} />
					<!--passing the currentFolderindex to the createnote-->
				</div>
			</div>
		{/if}
		<div class="notes">
			{#if $folders[currentFolderIndex].notes.length > 0}
				<!--if the notesarray is not empty-->
				{#each $folders[currentFolderIndex].notes as note (note.id)}
					<svelte:component
						this={Note}
						{currentFolderIndex}
						noteId={note.id}
						on:click={() => currentNoteId.set(note.id)}
						on:keydown={() => currentNoteId.set(note.id)}
					/>
				{/each}
			{:else}
				<!--if the array length is zero, then we will ask them to create some notes-->
				<NoNotes {currentFolderIndex} />
			{/if}
		</div>
	</div>
{:else}
	<!--if no Folder are selected then-->
	<PickFolder />
{/if}

<style>
	@media (min-width: 1740px) {
		h1 {
			font-size: 2.62rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		h1 {
			font-size: 2.45rem;
		}
	}

	@media (min-width: 1024px) and (max-width: 1429px) {
		h1 {
			font-size: 2.07rem;
		}
	}

	@media (min-width: 1024px) {
		.mast {
			width: 75%;
		}
	}

	@media (min-width: 649px) and (max-width: 1023px) {
		h1 {
			font-size: 2.2rem;
		}
		.mast {
			width: 62%;
		}
		.notes {
			margin-top: 0.5rem;
		}
	}

	@media (min-width: 550px) and (max-width: 649px) {
		h1 {
			font-size: 2.05rem;
		}
		.mast {
			width: 70%;
		}
		.notes {
			margin-top: 0.5rem;
		}
	}

	@media (max-width: 549px) {
		h1 {
			font-size: 1.6rem;
		}
		.mast {
			width: 85%;
		}
		.notes {
			margin-top: 0.4rem;
		}
	}

	.mast {
		height: 10%;
		margin: 1.2rem 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.notes-and-title {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		align-items: center;
	}

	.notes {
		overflow-y: auto;
		width: 100%;
		height: 100%;
	}

	h1 {
		font-weight: normal;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 70%;
	}

	.title-btn {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
</style>
