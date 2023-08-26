<!--this connects all the comps in the notes folder. it will be impported to the dashboard-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // importing the folders and the id's
	import CreateNote from '$lib/components/notes/CreateNote.svelte';
	import Note from '$lib/components/notes/Note.svelte';
	import NoNotes from '$lib/components/notes/NoNotes.svelte';
	import PickFolder from '$lib/components/notes/PickFolder.svelte';
	export let currentFolderIndex: number; // fulfilled by the +page.svelte
</script>

{#if $currentFolderId}
	<!--incase if any Folder are selected-->
	<div role="menu" class="notes-and-title">
		<!---->
		{#if ($folders[currentFolderIndex].notes.length > 0 && matchMedia('(min-width:1024px)').matches) || matchMedia('(max-width:1023px)').matches}
			<div class="titleandbtn" role="group">
				<h1>{@html $folders[currentFolderIndex].title.replace(/ /g, '&nbsp;')}</h1>
				<!--the regex to preserve the whitespaces-->
				<!--the title of that Folder-->
				<svelte:component this={CreateNote} {currentFolderIndex} />
				<!--passing the currentFolderindex to the createnote-->
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
	@media screen and (min-width: 1740px) {
		h1 {
			font-size: 2.62rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		h1 {
			font-size: 2.45rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
		h1 {
			font-size: 2.07rem;
		}
	}
	@media screen and (min-width: 1024px) {
		.titleandbtn {
			width: 75%;
		}
	}
	@media screen and (min-width: 649px) and (max-width: 1023px) {
		h1 {
			font-size: 2.5rem;
		}
		.titleandbtn {
			width: 62%;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 649px) {
		h1 {
			font-size: 2.2rem;
		}
		.titleandbtn {
			width: 70%;
		}
	}
	@media screen and (max-width: 549px) {
		h1 {
			font-size: 1.7rem;
		}
		.titleandbtn {
			width: 85%;
		}
	}
	.titleandbtn {
		height: 10%;
		margin-top: 1.2rem;
		margin-bottom: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
</style>
